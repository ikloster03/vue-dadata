export interface Suggestion {
  token: string;
  query: string;
  url?: string;
  count?: number;
  toBound?: string;
  fromBound?: string;
}
export interface SuggestionPayload {
  query: string;
  count?: number;
  to_bound?: object;
  from_bound?: object;
}
