/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { Suggestion, SuggestionPayload } from '@/types/Suggestion';
import DadataSuggestion from '@/types/DadataSuggestion';

const DEFAULT_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
async function getSuggestions({
  token,
  query,
  url,
  count = 10,
  toBound,
  fromBound,
}: Suggestion): Promise<DadataSuggestion[]> {
  url = url || DEFAULT_URL;

  const payload: SuggestionPayload = {
    query,
    count,
    to_bound: { value: toBound },
    from_bound: { value: fromBound },
  };
  try {
    const {
      data: { suggestions },
    } = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    return suggestions;
  } catch (error) {
    throw new Error(error);
  }
}

export default getSuggestions;
