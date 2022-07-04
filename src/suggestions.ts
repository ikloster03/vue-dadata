import {
  computed, ref, watch, Ref,
} from 'vue';
import { debounce } from 'vue-debounce';
import {
  BoundsType, KeyEvent, LocationOptions, Suggestion, SuggestionDto,
} from './types';
import { getSuggestions } from './api';

const useSuggestions = (
  props: {
    modelValue: string,
    suggestion: Suggestion | undefined,
    token: string,
    url?: string,
    disabled?: boolean,
    debounceWait?: number | string,
    toBound?: BoundsType,
    fromBound?: BoundsType,
    locationOptions?: LocationOptions,
    autocomplete: boolean,
  },
  // eslint-disable-next-line no-unused-vars
  emit: (event: 'update:modelValue' | 'update:suggestion' | 'handleError', ...args: any[]) => void,
) => {
  const queryProxy = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  const suggestionProxy = computed({
    get: () => props.suggestion,
    set: (value) => emit('update:suggestion', value),
  });

  const inputFocused = ref(false);
  const suggestionsVisible = ref(true);
  const suggestionIndex = ref(-1);
  const suggestionList: Ref<Suggestion[]> = ref([]);
  const suggestionItem: Ref<Suggestion | undefined> = ref(undefined);

  const fetchSuggestions = async (count?: number): Promise<Suggestion[]> => {
    try {
      const request: SuggestionDto = {
        token: props.token,
        query: queryProxy.value,
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
  }, props.debounceWait as string | number);

  watch(queryProxy, async () => {
    fetchWithDebounce();
  });

  const resetSuggestions = () => {
    if (props.disabled) {
      return;
    }

    suggestionsVisible.value = false;
    suggestionIndex.value = -1;
  };

  const selectSuggestion = (index: number) => {
    if (props.disabled) {
      return;
    }

    if (suggestionList.value.length >= index - 1) {
      queryProxy.value = suggestionList.value[index].value;
      suggestionItem.value = suggestionList.value[index];
      suggestionProxy.value = suggestionList.value[index];
    }
  };

  const onInputChange = () => {
    if (props.disabled) {
      return;
    }

    suggestionsVisible.value = true;
  };

  const limitUp = computed(() => suggestionIndex.value < suggestionList.value.length - 1);
  const limitDown = computed(() => suggestionIndex.value >= 0);
  const withinTheBoundaries = computed(() => limitDown.value && limitUp.value);

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

    if (props.autocomplete) {
      queryProxy.value = suggestionItem.value ? suggestionItem.value?.value : '';
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
  };
};

export default useSuggestions;
