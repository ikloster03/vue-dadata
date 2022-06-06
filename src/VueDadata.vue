<template>
  <div :class="proxyClasses.container">
    <div :class="proxyClasses.search">
      <input
        v-model="query"
        type="text"
        :name="inputName"
        :class="proxyClasses.input"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="onInputChange"
        @keyup.enter="onKeyPress($event, KeyEvent.Enter)"
        @keyup.esc="onKeyPress($event, KeyEvent.Esc)"
        @keyup.up="onKeyPress($event, KeyEvent.Up)"
        @keyup.down="onKeyPress($event, KeyEvent.Down)"
        @focus="onInputFocus"
        @blur="onInputBlur">
    </div>
    <div
      v-if="inputFocused && suggestionsVisible && !disabled"
      :class="proxyClasses.suggestions">
      <slot
        name="suggestions"
        :suggestion-list="suggestionList"
        :suggestion-index="suggestionIndex"
        :query="query">
        <word-highlighter
          v-for="(suggestion, index) in suggestionList"
          :key="`suggestion_${index}`"
          v-bind="proxyHighlightOptions"
          :wrapper-class="proxyClasses.suggestionItem"
          :class="index === suggestionIndex ? proxyClasses.suggestionCurrentItem : ''"
          :query="query"
          :text-to-highlight="suggestion.value"
          @mousedown="onSuggestionClick(index)" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  Ref,
  ref,
  watch,
} from 'vue';
import WordHighlighter from 'vue-word-highlighter';
import { debounce } from 'vue-debounce';
import {
  BoundsType,
  LocationOptions,
  SuggestionDto,
  VueDadataClasses,
  KeyEvent,
  HighlightOptions,
  Suggestion,
} from './types';
import { getSuggestions } from './api';
import { DEFAULT_CLASSES, DEFAULT_HIGHLIGHT_OPTIONS } from './const';

export default defineComponent({
  name: 'VueDadata',
  components: {
    WordHighlighter,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: undefined,
    },
    debounceWait: {
      type: String || Number,
      default: '1000ms',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fromBound: {
      type: String as PropType<BoundsType>,
      default: undefined,
    },
    toBound: {
      type: String as PropType<BoundsType>,
      default: undefined,
    },
    inputName: {
      type: String,
      default: 'vue-dadata-input',
    },
    locationOptions: {
      type: Object as PropType<LocationOptions> | undefined,
      default: undefined,
    },
    classes: {
      type: Object as PropType<VueDadataClasses>,
      default: () => DEFAULT_CLASSES,
    },
    highlightOptions: {
      type: Object as PropType<HighlightOptions>,
      default: () => DEFAULT_HIGHLIGHT_OPTIONS,
    },
  },
  emits: ['update:modelValue', 'handleError'],
  setup(props, { emit }) {
    const query = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const inputFocused = ref(false);
    const suggestionsVisible = ref(true);
    const suggestionIndex = ref(-1);
    const suggestionList: Ref<Suggestion[]> = ref([]);

    const proxyClasses: ComputedRef<VueDadataClasses> = computed(() => ({
      container: props.classes?.container ?? DEFAULT_CLASSES.container,
      search: props.classes?.search ?? DEFAULT_CLASSES.search,
      input: props.classes?.input ?? DEFAULT_CLASSES.input,
      suggestions: props.classes?.suggestions ?? DEFAULT_CLASSES.suggestions,
      suggestionItem: props.classes?.suggestionItem ?? DEFAULT_CLASSES.suggestionItem,
      suggestionCurrentItem: props.classes?.suggestionCurrentItem ?? DEFAULT_CLASSES.suggestionCurrentItem,
    }));

    const proxyHighlightOptions: ComputedRef<HighlightOptions> = computed(() => ({
      caseSensitive: props.highlightOptions?.caseSensitive ?? DEFAULT_HIGHLIGHT_OPTIONS.caseSensitive,
      splitBySpace: props.highlightOptions?.splitBySpace ?? DEFAULT_HIGHLIGHT_OPTIONS.splitBySpace,
      highlightTag: props.highlightOptions?.highlightTag ?? DEFAULT_HIGHLIGHT_OPTIONS.highlightTag,
      highlightClass: props.highlightOptions?.highlightClass ?? DEFAULT_HIGHLIGHT_OPTIONS.highlightClass,
      highlightStyle: props.highlightOptions?.highlightStyle ?? DEFAULT_HIGHLIGHT_OPTIONS.highlightStyle,
      wrapperTag: props.highlightOptions?.wrapperTag ?? DEFAULT_HIGHLIGHT_OPTIONS.wrapperTag,
      wrapperClass: props.highlightOptions?.wrapperClass ?? DEFAULT_HIGHLIGHT_OPTIONS.wrapperClass,
    }));

    const fetchSuggestions = async (count?: number): Promise<Suggestion[]> => {
      try {
        const request: SuggestionDto = {
          token: props.token,
          query: query.value,
          url: props.url,
          toBound: props.toBound,
          fromBound: props.fromBound,
          locationOptions: props.locationOptions,
          count,
        };

        return getSuggestions(request);
      } catch (error) {
        emit('handleError', error);

        return new Promise<Suggestion[]>((resolve) => {
          resolve([]);
        });
      }
    };

    const fetchWithDebounce = debounce(async () => {
      suggestionList.value = await fetchSuggestions();
    }, props.debounceWait);

    watch(query, async () => {
      fetchWithDebounce();
    });

    const resetSuggestions = () => {
      if (props.disabled) {
        return;
      }

      suggestionsVisible.value = false;
      suggestionIndex.value = -1;
      suggestionList.value = [];
    };

    const selectSuggestion = (index: number) => {
      if (props.disabled) {
        return;
      }

      if (suggestionList.value.length >= index - 1) {
        query.value = suggestionList.value[index].value;
      }
    };

    const onInputChange = () => {
      if (props.disabled) {
        return;
      }

      suggestionsVisible.value = true;
    };

    const withinTheBoundaries = computed(() => suggestionIndex.value >= 0 && suggestionIndex.value < suggestionList.value.length - 1);

    const limitUp = computed(() => suggestionIndex.value < suggestionList.value.length - 1);
    const limitDown = computed(() => suggestionIndex.value >= 0);

    const onKeyPress = (keyboardEvent: KeyboardEvent, keyEvent: KeyEvent) => {
      if (props.disabled) {
        return;
      }

      keyboardEvent.preventDefault();

      if (keyEvent === KeyEvent.Enter) {
        if (withinTheBoundaries.value) {
          selectSuggestion(suggestionIndex.value);
          resetSuggestions();
        }
      }

      if (keyEvent === KeyEvent.Esc) {
        suggestionsVisible.value = false;
      }

      if (keyEvent === KeyEvent.Up) {
        if (limitDown.value) {
          suggestionIndex.value -= 1;
        }
      }

      if (keyEvent === KeyEvent.Down) {
        if (limitUp.value) {
          suggestionIndex.value += 1;
        }
      }
    };

    const onInputFocus = () => {
      if (props.disabled) {
        return;
      }

      inputFocused.value = true;
    };

    const onInputBlur = () => {
      if (props.disabled) {
        return;
      }

      inputFocused.value = false;
    };

    const onSuggestionClick = (index: number) => {
      if (props.disabled) {
        return;
      }

      selectSuggestion(index);
      resetSuggestions();
    };

    return {
      KeyEvent,
      query,
      inputFocused,
      suggestionsVisible,
      suggestionList,
      proxyClasses,
      proxyHighlightOptions,
      suggestionIndex,

      onInputChange,
      onKeyPress,
      onInputFocus,
      onInputBlur,
      onSuggestionClick,
    };
  },
});
</script>

<style>
.vue-dadata__container {
  width: 100%;
  position: relative;
}

.vue-dadata__input {
  font-size: 14px;
  width: 100%;
  height: 47px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #f1c40f;
  transition: 0.3s;
  box-sizing: border-box;
  padding: 0 5px;
}

.vue-dadata__input:focus {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
  0 0 0 3px rgba(255, 154, 0, 0.1);
  border-color: #ff931e;
}

.vue-dadata__suggestions {
  position: absolute;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.vue-dadata__suggestions-item {
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.vue-dadata__suggestions-item-highlight {
  background-color: #ffdfbd;
}

.vue-dadata__suggestions-item:hover {
  background-color: #ffdfbd;
}

.vue-dadata__suggestions-item_current {
  background-color: #fff5e7;
}
</style>
