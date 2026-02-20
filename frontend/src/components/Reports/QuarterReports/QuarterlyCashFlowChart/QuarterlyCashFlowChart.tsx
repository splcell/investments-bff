/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Chart } from "../../../Chart";
import type { Report } from "../../../../types/report";
import type { Company } from "../../../../types/company";

interface QuarterlyCashFlowChartProps{
  cashFlow: Report[];
  profile: Company;
}

export const QuarterlyCashFlowChart = ({ cashFlow, profile }: QuarterlyCashFlowChartProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [changeCash, setChangeCash] = useState<number[]>([]);
  const chartColor = ["#434348"];

  useEffect(() => {
    if (cashFlow?.length) {
      const newChartData = [];
      const newCategories = [];

      for (let i = 0; i < cashFlow.length; i++) {
        const changeCash = Number(
          Number(
            cashFlow[i]?.freeCashFlow
          ) / 1000000
        );
        newChartData.unshift(changeCash);
        newCategories.unshift(
          cashFlow[i].period +
            " " +
            new Date(cashFlow[i].date).getFullYear().toString()
        );
      }

      setChangeCash(newChartData);
      setCategories(newCategories);
    }
  }, [cashFlow]);

  return (
    <Chart
      chartData={changeCash}
      categories={categories}
      text={`Free Cash Flow (mln ${profile.currency})`}
      type="column"
      color={chartColor}
      rangeSelectorStatus={false}
      navigatorStatus={false}
      scrollBarStatus={false}
      width={590}
      height={300}
      pointWidth={20}
      legend={false}
      data-testid="quarterlyCashFlow"
    />
  );
};