import { computed, ComputedRef } from 'vue';
import { VueDadataClasses } from './types';
import { DEFAULT_CLASSES } from './const';

const useClasses = (classes?: VueDadataClasses): ComputedRef<VueDadataClasses> => computed(() => ({
  container: classes?.container ?? DEFAULT_CLASSES.container,
  search: classes?.search ?? DEFAULT_CLASSES.search,
  input: classes?.input ?? DEFAULT_CLASSES.input,
  suggestions: classes?.suggestions ?? DEFAULT_CLASSES.suggestions,
  suggestionItem: classes?.suggestionItem ?? DEFAULT_CLASSES.suggestionItem,
  suggestionCurrentItem: classes?.suggestionCurrentItem ?? DEFAULT_CLASSES.suggestionCurrentItem,
}));

export default useClasses;
