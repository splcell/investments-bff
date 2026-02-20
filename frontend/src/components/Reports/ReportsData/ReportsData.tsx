/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/preserve-manual-memoization */
import { memo, useMemo, useCallback } from "react";
import styles from "./ReportsData.module.scss";
import type { Report } from "../../../types/report";
import type { Company } from "../../../types/company";
import { convertData } from "../../../helpers/convertData";
import { camelToWords } from "../../../helpers/camelToWords";

interface ReportsDataProps {
  report: Report[];
  reportType: "Balance" | "Income" | "Cash Flow";
  period: "annual" | "quarterly";
  profile: Company;
}

const ignoredKeys = new Set([
  "date",
  "symbol",
  "reportedCurrency",
  "cik",
  "filingDate",
  "acceptedDate",
  "period",
]);

export const ReportsData = memo(
  ({ report, reportType, period, profile }: ReportsDataProps) => {
    const renderItem = useCallback((item: any, key: any) => {
      if (typeof item !== "string") {
        if (typeof item === "number" && item.toString().includes(".")) {
          if (typeof key[0] === "string" && key[0].indexOf("EPS") === -1) {
            return (item * 100).toFixed(1);
          }
        } else {
          return convertData(item);
        }
      }

      if (
        typeof key[0] === "string" &&
        key[0].indexOf("EPS") !== -1 &&
        typeof item !== "number"
      ) {
        return (
          <>
            {item} ({profile?.currency})
          </>
        );
      }

      return item;
    }, []);

    const tableData = useMemo(() => {
      const newData: any = {};
      switch (reportType) {
        case "Balance":
          report.forEach((item: Report) => {
            if (item) {
              Object.keys(item).forEach((key) => {
                if (ignoredKeys.has(key)) return;

                const balanceItem = item[key];
                const label = camelToWords(key);
                const value = balanceItem !== undefined ? balanceItem : "-";

                // Инициализируем массив, если он еще не создан
                if (!newData[label]) {
                  newData[label] = [];
                }

                newData[label].push(value);
              });
            }
          });
          break;
        case "Income":
          report.forEach((item) => {
            if (item) {
              Object.keys(item).forEach((key) => {
                if (ignoredKeys.has(key)) return;

                const incomeItem = item[key];
                const label = camelToWords(key);
                const value = incomeItem !== undefined ? incomeItem : "-";

                // Инициализируем массив, если он еще не создан
                if (!newData[label]) {
                  newData[label] = [];
                }

                newData[label].push(value);
              });
            }
          });
          break;
        case "Cash Flow":
          report.forEach((item) => {
            if (item) {
              Object.keys(item).forEach((key) => {
                if (ignoredKeys.has(key)) return;

                const cashFlowItem = item[key];
                const label = camelToWords(key);
                const value = cashFlowItem !== undefined ? cashFlowItem : "-";

                if (!newData[label]) {
                  newData[label] = [];
                }

                newData[label].push(value);
              });
            }
          });
          break;
      }
      return newData;
    }, [report, reportType]);

    if (period === "quarterly") {
      return (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>
                {reportType} (mln {profile?.currency})
              </th>
              {report?.map((item: Report) => (
                <th
                  className={styles.yearTh}
                  key={item.date}
                >{`${item.period}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(tableData).map((key) => (
              <>
                {tableData[key] && tableData[key].length > 1 ? (
                  <tr key={key}>
                    <td title={key.length > 30 ? key : ""}>
                      {key.length > 30 ? key.slice(0, 30) + "..." : key}
                    </td>
                    {tableData[key].map((item: any, index: number) => (
                      <>
                        <td align="center" key={index}>
                          {renderItem(item, tableData[key])}
                        </td>
                      </>
                    ))}
                  </tr>
                ) : null}
              </>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>
              {reportType} Annual (mln {profile?.currency})
            </th>
            {report?.map((item: Report) => (
              <th key={item.date}>{item.fiscal_year}</th>
              
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(tableData).map((key) => (
            <>
              {tableData[key] && tableData[key].length > 1 ? (
                <tr key={key}>
                  <td title={key.length > 30 ? key : ""}>
                    {key.length > 30 ? key.slice(0, 30) + "..." : key}
                  </td>
                  {tableData[key].map((item: any, index: number) => (
                    <>
                      <td align="center" key={index}>
                        {renderItem(item, tableData[key])}
                      </td>
                    </>
                  ))}
                </tr>
              ) : null}
            </>
          ))}
        </tbody>
      </table>
    );
  },
);
