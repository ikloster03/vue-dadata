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
          :autoComplete="autocomplete"
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { BoundsType } from '@/types/DadataAddress';
import DadataSuggestion from '@/types/DadataSuggestion';
import LocationOptions from '@/types/LocationOptions';
import getSuggestions from '@/api/getSuggestions';
import Highlighter from 'vue-highlight-words';
import { Debounce } from 'vue-debounce-decorator';

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
  @Prop(String) public readonly inputName?: string;
  @Prop({
    type: Object,
    default: () => ({
      language: 'ru',
      locations: [],
      locationsBoost: [],
      restrictValue: false,
    }),
  })
  public readonly locationOptions!: LocationOptions;
  @Prop(String) public readonly highlightClassName?: string;
  @Prop(String) public readonly unhighlightClassName?: string;
  @Prop({ type: String, default: 'mark' })
  public readonly highlightTag?: string;
  @Prop({ type: String, default: 'vue-dadata' })
  public readonly defaultClass?: string;
  @Prop({ type: String, default: '' }) public readonly classes?: string;
  @Prop(Function) public readonly onChange?: (
    suggestion: DadataSuggestion | null,
  ) => void;
  @Prop(Function) public readonly validate?: (value: string) => void;

  public inputQuery = '';
  public inputFocused = false;
  public suggestions: DadataSuggestion[] = [];
  public suggestionIndex = -1;
  public suggestionsVisible = true;
  public isValid = false;

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
  }

  public async onInputBlur() {
    this.inputFocused = false;
  }

  setInputQuery(value: string) {
    this.inputQuery = value ? value : '';
  }

  @Debounce(300)
  public async onInputChange(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    this.inputQuery = value;
    this.suggestionsVisible = true;
    this.suggestions = await this.fetchSuggestions();
  }

  public async selectSuggestion(index: number) {
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
        await this.selectSuggestion(this.suggestionIndex);
      }
    }
  }

  public async onSuggestionClick(index: number) {
    await this.selectSuggestion(index);
  }

  private async fetchSuggestions(count?: number): Promise<DadataSuggestion[]> {
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

      const suggestions = await getSuggestions(request);

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
