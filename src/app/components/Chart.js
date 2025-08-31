import React, { useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import { color } from "../utils/colorScheme";
import { useSelector } from "react-redux";
import { FaClipboardList } from "react-icons/fa6";
import Loader from "./Loader";

const Chart = ({ table }) => {
  const { tableContent, colorTheme } = useSelector((state) => state.excel);
  const chartData = useMemo(() => {
    const cityCounts = {};
    table?.forEach((item) => {
      cityCounts[item.City] = (cityCounts[item.City] || 0) + 1;
    });

    // Convert to chart data format
    return Object.keys(cityCounts)?.map((city) => ({
      name: city,
      value: cityCounts[city],
    }));
  }, [table]);

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
            data: chartData?.map((item) => ({
              name: item.name,
              y: item.value,
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
                maxWidth: 500,
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
  }, [chartData]);

  return <>{chartData ? <div ref={chartComponent} /> : <Loader />}</>;
};

export default Chart;
