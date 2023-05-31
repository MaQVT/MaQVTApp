import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { generateChartRoleData } from "../../utils/chartFunctions";

function ChartComponentRole({ formData, step, title }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chartData = generateChartRoleData(formData, step);

    if (chartRef.current) {
      // If chart already exists, destroy it
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              display: false
            },
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          },
        },
        plugins: {
          legend: {
            position: "top",
            display: false,
          },
          tooltip:{
            enabled: false
          }
        },
      },
    });

    // Make sure to return the destroy method on cleanup
    return () => {
      chartRef.current.destroy();
    };
  }, [formData, step]);

  return (
    <div className="flex flex-col p-4 w-[500px] lg:w-max-[700px] lg:w-[80%] rounded-lg items-center m-2 md:w-full">
      <h1 className="text-xl my-4">{title}</h1>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ChartComponentRole;
