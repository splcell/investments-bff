import { createTableData } from "../../../../helpers/createtableData";
import type { Company } from "../../../../types/company";
import type { Report } from "../../../../types/report"
import { ReportsData } from "../../ReportsData/ReportsData";

interface AnnualCashFlowTableProps{
  cashFlow: Report[];
  profile: Company;
}

export const AnnualCashFlowTable = ({cashFlow, profile}: AnnualCashFlowTableProps) => {
  const tableData = createTableData(cashFlow)

  return(
    <ReportsData 
      report={tableData}
      period="annual"
      profile={profile}
      reportType="Cash Flow"
    />
  )
}