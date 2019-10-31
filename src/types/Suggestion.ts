export interface Suggestion {
  token: string;
  query: string;
  url?: string;
  count?: number;
}
export interface SuggestionPayload {
  query: string;
  count?: number;
}
