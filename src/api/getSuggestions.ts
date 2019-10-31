import axios from 'axios';
import { Suggestion, SuggestionPayload } from '@/types/Suggestion';
import DadataSuggestion from '@/types/DadataSuggestion';

async function getSuggestions({
  token,
  query,
  count = 10,
}: Suggestion): Promise<DadataSuggestion[]> {
  const url: string =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  const payload: SuggestionPayload = { query, count };

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
