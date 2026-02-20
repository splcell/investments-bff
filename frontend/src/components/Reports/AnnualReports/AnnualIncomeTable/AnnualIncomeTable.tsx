import { createTableData } from "../../../../helpers/createtableData";
import type { Company } from "../../../../types/company";
import type { Report } from "../../../../types/report"
import { ReportsData } from "../../ReportsData/ReportsData";

interface AnnualIncomeTableProps{
  income: Report[];
  profile: Company
}

export const AnnualIncomeTable = ({income, profile}: AnnualIncomeTableProps) => {
  const tableData = createTableData(income)

  return(
    <ReportsData 
      report={tableData}
      period="annual"
      reportType="Income"
      profile={profile}
    />
  )
}