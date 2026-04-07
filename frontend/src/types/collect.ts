export type Collect = {
  symbol: string;
  companyName: string;
  companyLogo: string;
  currency: string;
}

export interface FullCollect extends Collect {
 price: number;
 change: number;
 changePercentage: number;
}

export type CollectResponse = {
  userCollection: Collect[]
}