<template>
  <div class="vue-dadata vue-dadata__container">
    <div class="vue-dadata__search">
      <input
        type="text"
        class="vue-dadata__input"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="inputQuery"
        :autoComplete="autocomplete"
        @change="onInputChange"
        @input="onInputChange"
        @keydown="onKeyPress"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>
    <div id="suggestions" class="vue-dadata__suggestions" v-show="suggestionsVisible">
      <span
        class="vue-dadata__suggestions-item"
        v-for="(suggestion, index) in suggestions"
        :key="`suggestion_${index}`"
        @click="onSuggestionClick(suggestion.value)"
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
    suggestion: DadataSuggestion[],
  ) => void;
  @Prop(Function) public readonly validate?: (value: string) => void;

  public inputQuery: string = '';
  public inputFocused: boolean = false;
  public suggestions: DadataSuggestion[] = [];
  public suggestionIndex: number = -1;
  public suggestionsVisible: boolean = false;
  public isValid: boolean = false;
  public pointer: number = 0;
  public buffersuggestionsVisible = false;

  public created() {
    // console.log('created');
    // TODO
  }

  public onInputFocus() {
    // console.log('onInputFocus');
    // TODO
    this.suggestionsVisible = true;
  }

  public onInputBlur(event) {
    // console.log(event);
    // this.suggestionsVisible = false
    // TODO
  }

  public async onInputChange() {
    if (this.buffersuggestionsVisible) {
      this.buffersuggestionsVisible = false;
      return 0;
    }

    this.suggestionsVisible = true;
    this.suggestions = await this.fetchSuggestions();
    // TODO
  }

  public async onKeyPress(event: KeyboardEvent) {
    const block = document.getElementById('suggestions');

    if (event.which === 13) {

      if (this.pointer === 0 && block.children.length > 0) {
        this.inputQuery = block.children[0].innerHTML;
      } else if (this.pointer > 0) {
        this.inputQuery = block.children[this.pointer - 1].innerHTML;
      }

      this.suggestionsVisible = false;
      this.buffersuggestionsVisible = true;
    }
    // Button UP
    if (event.which === 38) {
      if (this.pointer === 0) {
        block.children[this.pointer].style.backgroundColor = '#fff';
      } else {
        block.children[this.pointer - 1].style.backgroundColor = '#fff';
      }

      if (0 < this.pointer) {
        this.pointer--;
      }

      if (0 < this.pointer) {
        block.children[this.pointer - 1].style.backgroundColor = '#f1c40f';
      }

    }

    // Button DOWN
    if (event.which === 40) {

      if (this.pointer === 0) {
        block.children[this.pointer].style.backgroundColor = '#fff';
      } else {
        block.children[this.pointer - 1].style.backgroundColor = '#fff';
      }

      if (block.children.length > this.pointer) {
        this.pointer++;
      }

      block.children[this.pointer - 1].style.backgroundColor = '#f1c40f';
    }
  }

  public async onSuggestionClick(value: string) {
    this.inputQuery = value;
    const suggestions = await this.fetchSuggestions();

    if (this.inputQuery === suggestions[0].value && suggestions.length === 1) {
      this.suggestionsVisible = false;
    } else if (this.inputQuery === suggestions[0].value) {
      suggestions.shift();
      this.suggestions = suggestions;
    }
    // TODO
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
    }
  }
}
</style>
