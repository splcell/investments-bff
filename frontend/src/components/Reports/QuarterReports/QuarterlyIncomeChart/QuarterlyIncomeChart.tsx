/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

import type { Report } from "../../../../types/report";
import type { Company } from "../../../../types/company";
import { Chart } from "../../../Chart";

interface QuarterlyIncomeChartProps {
  income: Report[];
  profile: Company;
}

export const QuarterlyIncomeChart = ({
  income,
  profile,
}: QuarterlyIncomeChartProps) => {
  const [quarterlyRevenue, setQuarterlyRevenue] = useState<number[]>([]);
  const [quarterlyIncome, setQuarterlyIncome] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const chartColor = ["#434348", "#EFAF0A"];

  useEffect(() => {
    if (income?.length) {
      const newChartData = [];
      const newChartData2 = [];
      const newCategories = [];
      for (let i = 0; i < income.length; i++) {
        const revenue = Number(
          Number(income[i].revenue) /
            1000000,
        );
        const netIncome =
          Number(
            income[i]?.netIncome,
          ) / 1000000;
        newChartData.unshift(revenue);
        newChartData2.unshift(netIncome);
        newCategories.unshift(
          income[i].period +
            " " +
            new Date(income[i].date).getFullYear().toString(),
        );
      }

      setQuarterlyRevenue(newChartData);
      setQuarterlyIncome(newChartData2);
      setCategories(newCategories);
    }
  }, [income]);

  return (
    <Chart
      chartData={quarterlyRevenue}
      chartData2={quarterlyIncome}
      categories={categories}
      text={`Revenue (mln ${profile.currency})`}
      text2={`Net Income (mln ${profile.currency})`}
      type="column"
      color={chartColor}
      rangeSelectorStatus={false}
      navigatorStatus={false}
      scrollBarStatus={false}
      width={590}
      height={300}
      pointWidth={20}
      data-testid="quarterlyIncome"
    />
  );
};
