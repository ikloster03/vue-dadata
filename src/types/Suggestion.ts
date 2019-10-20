export interface Suggestion {
  token: string;
  query: string;
  count?: number;
}
export interface SuggestionPayload {
  query: string;
  count?: number;
}
