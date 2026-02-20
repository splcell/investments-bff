import { createTableData } from "../../../../helpers/createtableData";
import type { Company } from "../../../../types/company";
import type { Report } from "../../../../types/report";
import { ReportsData } from "../../ReportsData/ReportsData";

interface AnnualBalanceTableProps{
  balance: Report[];
  profile: Company
}

export const AnnualBalanceTable = ({ balance, profile }: AnnualBalanceTableProps) => {
  const tableData = createTableData(balance)

  return (
    <ReportsData
      period="annual"
      report={tableData}
      reportType="Balance"
      profile={profile}
    />
  );
};