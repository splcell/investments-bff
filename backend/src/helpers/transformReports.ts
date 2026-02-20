import { FullReport, Report } from "../types/report";

export const transformReports = (
  balance: Report[],
  income: Report[],
  cashFlow: Report[],
) => {

  const fullReport: FullReport = {
    balance: balance,
    income: income,
    cashFlow: cashFlow,
  };

  return fullReport;
};
