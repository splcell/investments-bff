export type Collect = {
  symbol: string;
  companyName: string;
  currency: string;
}

export type CollectResponse = {
  userCollection: Collect[]
}