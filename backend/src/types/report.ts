export type Report = {
  [key: string]: string | number;
};

export type FullReport = {
  balance: Report[]
  income: Report[]
  cashFlow: Report[]
};
