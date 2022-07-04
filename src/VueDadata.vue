<template>
  <div :class="proxyClasses.container">
    <div :class="proxyClasses.search">
      <input
        v-model="queryProxy"
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
        :query="queryProxy"
        :suggestion="suggestionProxy">
        <word-highlighter
          v-for="(suggestionItemList, suggestionIndexList) in suggestionList"
          :key="`suggestion_${suggestionIndexList}`"
          v-bind="proxyHighlightOptions"
          :wrapper-class="proxyClasses.suggestionItem"
          :class="suggestionIndexList === suggestionIndex ? proxyClasses.suggestionCurrentItem : ''"
          :query="queryProxy"
          :text-to-highlight="suggestionItemList.value"
          @mousedown="onSuggestionClick(suggestionIndexList)" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ComputedRef } from 'vue';
import WordHighlighter from 'vue-word-highlighter';
import {
  BoundsType,
  LocationOptions,
  VueDadataClasses,
  KeyEvent,
  HighlightOptions, Suggestion,
} from './types';
import { DEFAULT_CLASSES, DEFAULT_HIGHLIGHT_OPTIONS } from './const';
import useClasses from './classes';
import useHighlightOptions from './highlight-options';
import useSuggestions from './suggestions';

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
    suggestion: {
      type: Object as PropType<Suggestion | undefined>,
      default: () => undefined,
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
      type: String || Number as PropType<number | string>,
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
      type: Object as PropType<LocationOptions>,
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
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:suggestion', 'handleError'],
  setup(props, { emit }) {
    const proxyClasses: ComputedRef<VueDadataClasses> = useClasses(props.classes);
    const proxyHighlightOptions: ComputedRef<HighlightOptions> = useHighlightOptions(props.highlightOptions);
    const {
      queryProxy,
      suggestionProxy,
      inputFocused,
      suggestionsVisible,
      suggestionIndex,
      suggestionList,

      onInputChange,
      onKeyPress,
      onInputFocus,
      onInputBlur,
      onSuggestionClick,
    } = useSuggestions(props, emit);

    return {
      KeyEvent,
      queryProxy,
      suggestionProxy,
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

<style src="./index.css"></style>
