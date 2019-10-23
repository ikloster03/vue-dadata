<template>
  <div class="vue-dadata vue-dadata__container">
    <div class="vue-dadata__search">
      <input
        type="text"
        class="vue-dadata__input"
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
    <div id="suggestions" class="vue-dadata__suggestions" v-if="suggestionsVisible">
      <span
        v-for="(suggestion, index) in suggestions"
        :key="`suggestion_${index}`"
        @click="onSuggestionClick(index)"
        class="vue-dadata__suggestions-item"
        :class="{'vue-dadata__suggestions-item_current': index === suggestionIndex}"
      >{{ suggestion.value}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DadataAddress, { BoundsType } from '@/types/DadataAddress';
import DadataSuggestion from '@/types/DadataSuggestion';
import axios from 'axios';
import getSuggestions from '@/api/getSuggestions';

@Component({
  name: 'VueDadata',
})
export default class VueDadata extends Vue {
  @Prop({ type: String, required: true }) public readonly token!: string;
  @Prop(String) public readonly query?: string;
  @Prop(String) public readonly placeholder?: string;
  @Prop(Boolean) public readonly autoload?: boolean;
  @Prop(Number) public readonly count?: number;
  @Prop(String) public readonly autocomplete?: string;
  @Prop(Boolean) public readonly disabled?: boolean;
  @Prop(String) public readonly fromBound?: BoundsType;
  @Prop(String) public readonly toBound?: BoundsType;
  @Prop(String) public readonly address?: DadataSuggestion;
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
  protected textInput?: HTMLInputElement;

  public created() {
    // console.log('created');
    // TODO
  }

  public onInputFocus() {
    // console.log('onInputFocus');
    // TODO
    // this.suggestionsVisible = true;
  }

  public onInputBlur() {
    // console.log('onInputBlur');
    // console.log(event);
    // this.suggestionsVisible = false
    // TODO
  }

  public async onInputChange() {
    // console.log('onInputChange');
    this.suggestionsVisible = true;
    this.suggestions = await this.fetchSuggestions();
  }

  public async selectSuggestion(index: number) {
    // console.log('selectSuggestion');
    if (this.suggestions.length >= index - 1) {
      this.inputQuery = this.suggestions[index].value;
      this.suggestionsVisible = false;
      await this.$nextTick();
      await this.fetchSuggestions();

      if (this.onChange) {
        this.onChange(this.suggestions[index]);
      }
    }
  }

  public async onKeyPress(event: KeyboardEvent) {
    // console.log('onKeyPress', event.which);
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
    const suggestions = await getSuggestions({
      token: this.token,
      query: this.inputQuery,
    });

    return suggestions;
  }
}
</script>

<style lang="scss">
.vue-dadata {
  .vue-dadata__container {
    width: 100%;
  }

  &__input {
    font-size: 14px;
    width: 100%;
    height: 47px;
    outline: none;
  }

  &__suggestions {
    width: 100%;
    display: flex;
    flex-direction: column;
    &-item {
      padding: 10px;
      cursor: pointer;
      &:hover {
        background-color: #f1c40f;
      }
      &_current {
        background-color: #f1c40f;
      }
    }
  }
}
</style>
