export type SearchInfo = {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  currency_name: string;
};

export type SearchResult = {
  results: SearchInfo[];
  count: number;
}
