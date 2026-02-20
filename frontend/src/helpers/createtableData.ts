import type { Report } from "../types/report"

export const createTableData = (arr: Report[]) => {
  const tableData = arr ? [...arr].reverse() : []

  return tableData
}