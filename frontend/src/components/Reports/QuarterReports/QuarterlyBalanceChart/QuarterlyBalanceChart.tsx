/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Chart } from "../../../Chart";
import type { Report } from "../../../../types/report";
import type { Company } from "../../../../types/company";

interface QuarterlyBalanceChartProps{
  balance: Report[];
  profile: Company;
}

export const QuarterlyBalanceChart = ({ balance, profile }: QuarterlyBalanceChartProps) => {
  const [quarterlyAssets, setAnnualAssets] = useState<number[]>([]);
  const [quarterlyDebt, setAnnualDebt] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const chartColor = ["#434348", "#EFAF0A"];

  useEffect(() => {
    if (balance?.length) {
      const newChartData = [];
      const newChartData2 = [];
      const newCategories = [];
      for (let i = 0; i < balance.length; i++) {
        const assets = Number(Number(balance[i]?.totalAssets) / 1000000);
        const debt = Number(balance[i]?.netDebt) / 1000000;
        newChartData.unshift(assets);
        newChartData2.unshift(debt);
        newCategories.unshift(
          balance[i]?.period +
            " " +
            new Date(balance[i]?.date).getFullYear().toString()
        );
      }

      setAnnualAssets(newChartData);
      setAnnualDebt(newChartData2);
      setCategories(newCategories);
    }
  }, [balance]);

  return (
    <Chart
      chartData={quarterlyAssets}
      chartData2={quarterlyDebt}
      categories={categories}
      text={`Assets (mln ${profile.currency})`}
      text2={`Net Debt (mln ${profile.currency})`}
      type="column"
      color={chartColor}
      rangeSelectorStatus={false}
      navigatorStatus={false}
      scrollBarStatus={false}
      width={590}
      height={300}
      pointWidth={20}
      data-testid="quarterlyBalance"
    />
  );
};