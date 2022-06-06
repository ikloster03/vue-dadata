export interface HighlightOptions{
  caseSensitive?: boolean;
  splitBySpace?: boolean;
  highlightTag?: string;
  highlightClass?: string | object | Array<never>;
  highlightStyle?: string | object | Array<never>;
  wrapperTag?: string;
  wrapperClass?: string | object | Array<never>;
}
