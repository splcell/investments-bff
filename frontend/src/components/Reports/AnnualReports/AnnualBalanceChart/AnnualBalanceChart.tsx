/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Chart } from "../../../Chart";
import type { FullReport } from "../../../../types/report";
import type { Company } from "../../../../types/company";

interface AnnualBalanceChartProps{
  balance: FullReport["balance"]
  profile: Company
}

export const AnnualBalanceChart = ({ balance, profile }: AnnualBalanceChartProps) => {
  const [annualAssets, setAnnualAssets] = useState<number[]>([]);
  const [annualDebt, setAnnualDebt] = useState<number[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const chartColor = ["#434348", "#EFAF0A"];

  useEffect(() => {
    if (balance?.length) {
      const newChartData = [];
      const newChartData2 = [];
      const newCategories = [];
      for (let i = 0; i < balance?.length; i++) {
        const assets = Number(balance[i].totalAssets) / 1000000;
        const debt = Number(balance[i]?.netDebt) / 1000000;
        newChartData.unshift(assets);
        newChartData2.unshift(debt);
        newCategories.unshift(new Date(balance[i]?.acceptedDate).getFullYear());
      }
      setAnnualAssets(newChartData);
      setAnnualDebt(newChartData2);
      setCategories(newCategories);
    }
  }, [balance]);

  return (
    <Chart
      chartData={annualAssets}
      chartData2={annualDebt}
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
      data-testid="annualBalance"
    />
  );
};