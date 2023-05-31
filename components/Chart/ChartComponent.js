import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { generateChartData } from "../../utils/chartFunctions";

function ChartComponent({ formData, step }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chartData = generateChartData(formData, step);

    if (chartRef.current) {
      // If chart already exists, destroy it
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "scatter",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 10,
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    // Make sure to return the destroy method on cleanup
    return () => {
      chartRef.current.destroy();
    };
  }, [formData, step]);

  return <canvas ref={canvasRef} className="h-full w-full"/>;
}

export default ChartComponent;
