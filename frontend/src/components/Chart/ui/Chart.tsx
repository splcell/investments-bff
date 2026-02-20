import Highcharts from "highcharts/highstock.src.js";
import HighchartsReact from "highcharts-react-official";

interface ChartProps {
  chartData: number[];
  chartData2?: number[];
  categories: (string | number)[];
  text?: string;
  text2?: string;
  type?: string;
  color?: string[];
  width?: number;
  height?: number;
  rangeSelectorStatus?: boolean;
  navigatorStatus?: boolean;
  scrollBarStatus?: boolean;
  pointWidth?: number;
  legend?: boolean
}

export const Chart = ({
  chartData,
  chartData2,
  categories,
  text,
  text2 = "Centered",
  type = "area",
  color = ["#EFAF0A"],
  width = 1370,
  height = 400,
  rangeSelectorStatus = true,
  navigatorStatus = true,
  scrollBarStatus = true,
  pointWidth,

  legend = true,
}: ChartProps) => {
  const options = {
    chart: {
      width: width,
      height: height,
      type: "column",
    },

    title: {
      text: "",
    },

    legend: {
      enabled: legend,
    },

    subtitle: {},

    plotOptions: {
      series: {
        pointWidth: pointWidth,
      },

      column: {
        groupPadding: 0.4,
        borderWidth: 0,
      },
    },

    rangeSelector: {
      selected: 0,
      enabled: rangeSelectorStatus,
    },

    xAxis: {
      min: null,
      max: null,
      maxPadding: 0.1,
      categories: categories,
    },

    yAxis: {
      tickInterval: 0.5,
      gridLineWidth: 0,
      labels: {
        format: "{value:,.0f}",
      },
    },

    series: [
      {
        name: `${text}`,
        data: chartData,
        groupPadding: 0.2,
        type: type,
        threshold: null,
      },

      {
        name: `${text2}`,
        data: chartData2 || null,
        threshold: null,
      },
    ],

    colors: color,

    navigator: {
      enabled: navigatorStatus,
    },

    scrollbar: {
      enabled: scrollBarStatus,
    },

    // tooltip: {
    //   formatter: function (
    //     this: Highcharts.TooltipFormatterContextObject
    //   ): string {
    //     const categoryIndex = this.points ? this.points[0].point.index : 0;
    //     const category = categories ? categories[categoryIndex] : "";
    //     let value = this.y;
    //     return `<b>${category}</b><br/>Value: ${value}`;
    //   },

    //   type: 'datetime',
    // },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 300,
            },
            subtitle: {
              text: null,
            },
            navigator: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"stockChart"}
    />
  );
};
