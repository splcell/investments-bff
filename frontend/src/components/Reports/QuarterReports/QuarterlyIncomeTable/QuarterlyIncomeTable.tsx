import { createTableData } from "../../../../helpers/createtableData";
import type { Company } from "../../../../types/company";
import type { Report } from "../../../../types/report"
import { ReportsData } from "../../ReportsData/ReportsData";

interface QuarterlyIncomeTableProps{
  income: Report[];
  profile: Company;
}

export const QuarterlyIncomeTable = ({income, profile}: QuarterlyIncomeTableProps) => {
  const tableData = createTableData(income);

  return(
    <ReportsData 
      report={tableData}
      period="quarterly"
      profile={profile}
      reportType="Income"
    />
  )
}