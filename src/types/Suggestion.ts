import LocationOptions from '@/types/LocationOptions';

export interface Suggestion {
  token: string;
  query: string;
  url?: string;
  count?: number;
  toBound?: string;
  fromBound?: string;
  locationOptions: LocationOptions;
}

export interface SuggestionPayload {
  query: string;
  count?: number;
  to_bound?: object;
  from_bound?: object;
  language: string;
  locations: Array<object>;
  locations_boost: object;
  restrict_value: boolean;
}
