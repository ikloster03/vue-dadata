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
        @keydown="onKeyPress"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>
    <div class="vue-dadata__suggestions"></div>
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
  public suggestionsVisible: boolean = true;
  public isValid: boolean = false;

  public created() {
    // console.log('created');
    // TODO
  }

  public onInputFocus() {
    // console.log('onInputFocus');
    // TODO
  }

  public onInputBlur() {
    // console.log('onInputBlur');
    // TODO
  }

  public onInputChange() {
    // console.log('onInputChange');
    // TODO
  }

  public onKeyPress(event: KeyboardEvent) {
    // console.log('onKeyPress');
    // TODO
    if (event.which === 13) {
      // enter
      this.fetchSuggestions();
    }
  }

  public onSuggestionClick() {
    // console.log('onSuggestionClick');
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
}
</style>
