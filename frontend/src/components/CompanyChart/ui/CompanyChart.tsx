import React, { useEffect, useRef, memo } from "react";
import type { Company } from "../../../types/company";
import { Skeleton } from "../../Skeleton";

interface CompanyChartProps {
  company: Company;
  ticker: string;
  isLoading: boolean;
}

function CompanyChart({ company, ticker, isLoading }: CompanyChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": true,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "M",
          "locale": "en",
          "save_image": true,
          "style": "2",
          "symbol": "${company.exchange}:${ticker}",
          "theme": "light",
          "timezone": "Etc/UTC",
          "backgroundColor": "#ffffff",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true,
          "height": 250
        }`;
    container?.current?.appendChild(script);
  }, []);

  if (isLoading) {
    return <Skeleton width={"100%"} height={250} />;
  }

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(CompanyChart);
