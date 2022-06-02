<template>
  <div :class="[defaultClass, ...getClasses()]">
    <div :class="`${defaultClass}__container`">
      <div :class="`${defaultClass}__search`">
        <input
          type="text"
          :name="inputName"
          :class="`${defaultClass}__input`"
          :disabled="disabled"
          :placeholder="placeholder"
          v-model="inputQuery"
          ref="inputText"
          :auto-complete="autocomplete"
          @input="onInputChange"
          @keydown="onKeyPress"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
      </div>
      <div
        v-if="inputFocused && suggestionsVisible"
        :class="`${defaultClass}__suggestions`"
      >
        <highlighter
          v-for="(suggestion, index) in suggestions"
          :key="`suggestion_${index}`"
          @mousedown="onSuggestionClick(index)"
          :class="[
            `${defaultClass}__suggestions-item`,
            {
              [`${defaultClass}__suggestions-item_current`]:
                index === suggestionIndex,
            },
          ]"
          :search-words="inputQuery.split(' ')"
          :auto-escape="true"
          :text-to-highlight="suggestion.value"
          :highlight-class-name="highlightClassName"
          :unhighlight-class-name="unhighlightClassName"
          :highlight-tag="highlightTag"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Highlighter from 'vue-highlight-words';
import DadataSuggestion from '@/types/DadataSuggestion';
import getSuggestions from '@/api/getSuggestions';

interface VueDadataData {
  inputQuery: string;
  inputFocused: boolean;
  suggestions: DadataSuggestion[];
  suggestionIndex: number;
  suggestionsVisible: boolean;

}

export default /*#__PURE__*/Vue.extend({
  name: 'VueDadata', // vue component name
  components: {
    Highlighter
  },
  props: {
    token: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    autoload: {
      type: String,
      default: false
    },
    autocomplete: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    disabled: {
      type: String,
      default: false
    },
    fromBound: {
      type: String,
      default: ''
    },
    toBound: {
      type: String,
      default: ''
    },
    inputName: {
      type: String,
      default: ''
    },
    locationOptions: {
      type: Object,
      // default: false
    },
    highlightClassName: {
      type: String,
      default: ''
    },
    unhighlightClassName: {
      type: String,
      default: ''
    },
    highlightTag: {
      type: String,
      default: 'mark'
    },
    defaultClass: {
      type: String,
      default: 'vue-dadata'
    },
    classes: {
      type: String,
      default: ''
    },
    onChange: {
      type: Function,
      // default: ''
    },
  },
  data(): VueDadataData {
    const suggestions: DadataSuggestion[] = [];

    return {
      inputQuery: '',
      inputFocused: false,
      suggestions,
      suggestionIndex: -1,
      suggestionsVisible: true,
    };
  },
  async created() {
    this.inputQuery = this.query ? this.query : '';

    if (this.autoload && this.query) {
      this.suggestions = await this.fetchSuggestions();
    }
  },
  computed: {
    // changedBy() {
    //   const { message } = this as SampleData;
    //   if (!message.action) return 'initialized';
    //   return `${message.action} ${message.amount || ''}`.trim();
    // },
  },
  methods: {
    getClasses(): string[] {
      return this.classes ? this.classes.split(' ') : [];
    },

    onInputFocus() {
      this.inputFocused = true;
    },

    onInputBlur() {
      this.inputFocused = false;
    },

    async onInputChange(event: Event) {
      const value: string = (event.target as HTMLInputElement).value;
      this.inputQuery = value;
      this.suggestionsVisible = true;
      this.suggestions = await this.fetchSuggestions();
    },

    async selectSuggestion(index: number) {
      if (this.suggestions.length >= index - 1) {
        this.inputQuery = this.suggestions[index].value;
        this.suggestionsVisible = false;
        await this.$nextTick();

        if (this.onChange) {
          const suggestions = await this.fetchSuggestions(1);
          let suggestion: DadataSuggestion | null = null;

          if (suggestions.length > 0) {
            suggestion = suggestions[0];
          }

          this.onChange(suggestion);
        }

        this.suggestionIndex = -1;
        this.suggestions.length = 0;
      }
    },

    async onKeyPress(event: KeyboardEvent) {
      const ARROW_DOWN = 40;
      const ARROW_UP = 38;
      const ENTER = 13;

      if (event.which === ARROW_DOWN && this.suggestionsVisible) {
        event.preventDefault();
        if (this.suggestionIndex < this.suggestions.length - 1) {
          this.suggestionIndex = this.suggestionIndex + 1;
          this.inputQuery = this.suggestions[this.suggestionIndex].value;
        }
      } else if (event.which === ARROW_UP && this.suggestionsVisible) {
        event.preventDefault();
        if (this.suggestionIndex >= 0) {
          this.suggestionIndex = this.suggestionIndex - 1;
          this.inputQuery =
            this.suggestionIndex === -1
              ? this.inputQuery
              : this.suggestions[this.suggestionIndex].value;
        }
      } else if (event.which === ENTER) {
        event.preventDefault();
        if (this.suggestionIndex >= 0) {
          await this.selectSuggestion(this.suggestionIndex);
        }
      }
    },

    async onSuggestionClick(index: number) {
      await this.selectSuggestion(index);
    },

    async fetchSuggestions(count?: number): Promise<DadataSuggestion[]> {
      try {
        const request = {
          token: this.token,
          query: this.inputQuery,
          url: this.url,
          toBound: this.toBound,
          fromBound: this.fromBound,
          locationOptions: this.locationOptions,
          count,
        };

        return getSuggestions(request);
      } catch (error) {
        this.$emit('handleError', error);
        return [];
      }
    },
    // increment(arg: Event | number): void {
    //   const amount = (typeof arg !== 'number') ? 1 : arg;
    //   this.counter += amount;
    //   this.message.action = 'incremented by';
    //   this.message.amount = amount;
    // },
    // decrement(arg: Event | number): void {
    //   const amount = (typeof arg !== 'number') ? 1 : arg;
    //   this.counter -= amount;
    //   this.message.action = 'decremented by';
    //   this.message.amount = amount;
    // },
    // reset(): void {
    //   this.counter = this.initCounter;
    //   this.message.action = 'reset';
    //   this.message.amount = null;
    // },
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
