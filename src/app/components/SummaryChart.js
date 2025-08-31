import React, { useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import { color } from "../utils/colorScheme";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const SummaryChart = () => {
  const { summary } = useSelector((state) => state.excel);

  const summaryData = useMemo(() => {
    const total = summary.reduce((sum, item) => sum + item.count, 0);
    return summary.map((item) => ({
      name: item.make,
      y: (item.count / total) * 100, // percentage
    }));
  }, [summary]);

  const chartComponent = useRef(null);

  useEffect(() => {
    if (chartComponent.current) {
      Highcharts.chart(chartComponent.current, {
        chart: {
          type: "pie",
          zooming: {
            type: "xy",
          },

          load: function () {
            this.update({
              responsive: {
                rules: [
                  {
                    condition: {
                      maxWidth: 300,
                    },
                    chartOptions: {
                      plotOptions: {
                        pie: {
                          dataLabels: {
                            enabled: false, // Hide data labels on mobile devices
                          },
                        },
                      },
                      legend: {
                        enabled: false, // Optionally hide legend on mobile devices
                      },
                    },
                  },
                ],
              },
            });
          },
        },

        title: {
          text: null,
        },

        series: [
          {
            data: summaryData.map((item) => ({
              name: item.name,
              y: item.y,
            })),
            cursor: "pointer",
          },
        ],

        colors: color,
        plotOptions: {
          pie: {
            dataLabels: {
              formatter: function () {
                return `<span style="color: ${this.point.color};">${
                  this.point.name
                }</span>: ${Highcharts.numberFormat(this.percentage, 2)} %`;
              },
              style: {
                fontSize: "10px",
                fontFamily: "poppins",
                cursor: "pointer",
                fontWeight: 500,
              },
            },
          },
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 300,
              },
              chartOptions: {
                plotOptions: {
                  pie: {
                    dataLabels: {
                      enabled: false, // Hide data labels on mobile devices
                    },
                  },
                },
                legend: {
                  enabled: false, // Optionally hide legend on mobile devices
                },
              },
            },
          ],
        },
      });
    }
  }, [summaryData]);

  return <>{summaryData ? <div ref={chartComponent} /> : <Loader />}</>;
};

export default SummaryChart;
