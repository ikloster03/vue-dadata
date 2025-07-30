import { HighlightOptions } from '../types/highlight-options.types';

export const DEFAULT_HIGHLIGHT_OPTIONS: HighlightOptions = {
  caseSensitive: false,
  splitBySpace: false,
  highlightTag: 'mark',
  highlightClass: 'vue-dadata__suggestion-item-text_highlight',
  highlightStyle: '',
  wrapperTag: 'span',
  wrapperClass: '',
};
