<template>
  <div :class="[defaultClass, ...getClasses()]">
    <div :class="`${defaultClass}__container`">
      <div :class="`${defaultClass}__search`">
        <input
          type="text"
          :class="`${defaultClass}__input`"
          :disabled="disabled"
          :placeholder="placeholder"
          v-model="inputQuery"
          ref="inputText"
          :autoComplete="autocomplete"
          @change="onInputChange"
          @input="onInputChange"
          @keydown="onKeyPress"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
      </div>
      <div :class="`${defaultClass}__suggestions`" v-if="inputFocused && suggestionsVisible">
        <Highlighter
          v-for="(suggestion, index) in suggestions"
          :key="`suggestion_${index}`"
          @mousedown="onSuggestionClick(index)"
          :class="[`${defaultClass}__suggestions-item`, {[`${defaultClass}__suggestions-item_current`]: index === suggestionIndex}]"
          :searchWords="inputQuery.split(' ')"
          :autoEscape="true"
          :textToHighlight="suggestion.value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DadataAddress, { BoundsType } from '@/types/DadataAddress';
import DadataSuggestion from '@/types/DadataSuggestion';
import axios from 'axios';
import getSuggestions from '@/api/getSuggestions';
// @ts-ignore
import Highlighter from 'vue-highlight-words';

@Component({
  name: 'VueDadata',
  components: {
    Highlighter,
  },
})
export default class VueDadata extends Vue {
  @Prop({ type: String, required: true }) public readonly token!: string;
  @Prop(String) public readonly query?: string;
  @Prop(String) public readonly placeholder?: string;
  @Prop(Boolean) public readonly autoload?: boolean;
  @Prop(Number) public readonly count?: number;
  @Prop(String) public readonly autocomplete?: string;
  @Prop(String) public readonly url?: string;
  @Prop(Boolean) public readonly disabled?: boolean;
  @Prop(String) public readonly fromBound?: BoundsType;
  @Prop(String) public readonly toBound?: BoundsType;
  @Prop({ type: String, default: 'vue-dadata' })
  public readonly defaultClass?: string;
  @Prop({ type: String, default: '' }) public readonly classes?: string;
  @Prop(Function) public readonly onChange?: (
    suggestion: DadataSuggestion,
  ) => void;
  @Prop(Function) public readonly validate?: (value: string) => void;

  public inputQuery: string = '';
  public inputFocused: boolean = false;
  public suggestions: DadataSuggestion[] = [];
  public suggestionIndex: number = -1;
  public suggestionsVisible: boolean = true;
  public isValid: boolean = false;

  public getClasses(): string[] {
    return this.classes ? this.classes.split(' ') : [];
  }

  public async created() {
    this.inputQuery = this.query ? this.query : '';

    if (this.autoload && this.query) {
      this.suggestions = await this.fetchSuggestions();
    }
  }

  public async onInputFocus() {
    this.inputFocused = true;
    if (this.suggestions.length === 0) {
      this.suggestions = await this.fetchSuggestions();
    }
  }

  public async onInputBlur() {
    this.inputFocused = false;
    if (this.suggestions.length === 0) {
      this.suggestions = await this.fetchSuggestions();
    }
  }

  public async onInputChange(event: any) {
    const value: string = event.target.value;
    this.inputQuery = value;
    this.suggestionsVisible = true;
    this.suggestions = await this.fetchSuggestions();
  }

  public async selectSuggestion(index: number) {
    if (this.suggestions.length >= index - 1) {
      this.inputQuery = this.suggestions[index].value;
      this.suggestionsVisible = false;
      await this.$nextTick();
      await this.fetchSuggestions();

      if (this.onChange) {
        this.onChange(this.suggestions[index]);
      }
      this.suggestionIndex = -1;
    }
  }

  public async onKeyPress(event: KeyboardEvent) {
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
        this.selectSuggestion(this.suggestionIndex);
      }
    }
  }

  public async onSuggestionClick(index: number) {
    this.selectSuggestion(index);
  }

  private async fetchSuggestions(): Promise<DadataSuggestion[]> {
    try {
      const suggestions = await getSuggestions({
        token: this.token,
        query: this.inputQuery,
        url: this.url,
      });

      return suggestions;
    } catch (error) {
      this.$emit('handleError', error);
      return [];
    }
  }
}
</script>

<style lang="scss">
.vue-dadata {
  &__container {
    width: 100%;
    position: relative;
  }

  &__input {
    font-size: 14px;
    width: 100%;
    height: 47px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #f1c40f;
    transition: 0.3s;
    box-sizing: border-box;
    padding: 0 5px;

    &:focus {
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 3px rgba(255, 154, 0, 0.1);
      border-color: #ff931e;
    }
  }

  &__suggestions {
    position: absolute;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    &-item {
      padding: 10px;
      cursor: pointer;
      transition: 0.3s;

      &-highlight {
        background-color: #ffdfbd;
      }

      &:hover {
        background-color: #ffdfbd;
      }

      &_current {
        background-color: #fff5e7;
      }
    }
  }
}
</style>
