import { createTableData } from "../../../../helpers/createtableData";
import type { Company } from "../../../../types/company";
import type { Report } from "../../../../types/report"
import { ReportsData } from "../../ReportsData/ReportsData";

interface QuarterlyCashFlowTableProps{
  cashFlow: Report[];
  profile: Company;
}

export const QuarterlyCashFlowTable = ({cashFlow, profile}: QuarterlyCashFlowTableProps) => {
  const tableData = createTableData(cashFlow)

  return(
    <ReportsData 
      report={tableData}
      profile={profile}
      period="quarterly"
      reportType="Cash Flow"
    />
  )
}