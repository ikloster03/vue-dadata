import axios from 'axios';
import { SuggestionDto, SuggestionPayload, Suggestion } from '../types';

const DEFAULT_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getSuggestions = async (suggestion: SuggestionDto): Promise<Suggestion[]> => {
  const url = suggestion.url ?? DEFAULT_URL;
  const count = suggestion.count ?? 10;

  let payload: SuggestionPayload = {
    query: suggestion.query,
    count,
  };

  if (suggestion.toBound) {
    payload = {
      ...payload,
      to_bound: { value: suggestion.toBound },
    };
  }

  if (suggestion.fromBound) {
    payload = {
      ...payload,
      from_bound: { value: suggestion.fromBound },
    };
  }

  if (suggestion.locationOptions) {
    payload = {
      ...payload,
      language: suggestion.locationOptions.language,
      locations: suggestion.locationOptions.locations,
      locations_boost: suggestion.locationOptions.locationsBoost,
    };
  }

  const config = {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Token ${suggestion.token}`,
    },
  };

  const {
    data: { suggestions },
  } = await axios.post(url, payload, config);

  return suggestions;
};
