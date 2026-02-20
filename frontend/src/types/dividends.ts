export interface DividendsResponse {
  request_id: number;
  results: Dividend[];
  status: string;
  next_url?: string
}

export interface Dividend {
  cash_amount: number;
  currency: string;
  declaration_date: string;
  distribution_type: string;
  ex_dividend_date: string;
  frequency: number;
  historical_adjustment_factor: number;
  id: string;
  pay_date: string;
  record_date: string;
  split_adjusted_cash_amount: number;
  ticker: string;
}