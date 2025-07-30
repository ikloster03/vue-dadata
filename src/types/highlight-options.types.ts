export interface HighlightOptions {
  caseSensitive?: boolean;
  splitBySpace?: boolean;
  highlightTag?: string;
  highlightClass?: string | Record<string, boolean> | string[];
  highlightStyle?: string | Record<string, boolean> | string[];
  wrapperTag?: string;
  wrapperClass?: string | object | string[];
}
