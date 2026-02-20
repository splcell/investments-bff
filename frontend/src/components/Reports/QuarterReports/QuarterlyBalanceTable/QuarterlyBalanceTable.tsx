import { createTableData } from "../../../../helpers/createtableData";
import type { Company } from "../../../../types/company";
import type { Report } from "../../../../types/report"
import { ReportsData } from "../../ReportsData/ReportsData";

interface QuarterlyBalanceTableProps{
  balance: Report[];
  profile: Company;
}

export const QuarterlyBalanceTable = ({balance, profile}: QuarterlyBalanceTableProps) => {
  const tableData = createTableData(balance)


  return(
    <ReportsData 
      report={tableData}
      period="quarterly"
      profile={profile}
      reportType="Balance"
    />
  )
}