import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PlaceTravailChart({
  formData,
  chartFunction,
  title,
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chartData = chartFunction(formData);

    if (chartRef.current) {
      // If chart already exists, destroy it
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        // scales: {
        //   r: {
        //     // min: 0,
        //     // max: 7,
        //     ticks: {
        //       stepSize: 1,
        //       display: false,
        //     },
        //     pointLabels: {
        //       font: {
        //         size: 12,
        //       },
        //     },
        //   },
        // },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        plugins: {
          legend: {
            position: "right",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Make sure to return the destroy method on cleanup
    return () => {
      chartRef.current.destroy();
    };
  }, [formData]);

  return (
    <div className="flex flex-col p-4 rounded-lg items-center m-2">
      <h1 className="text-xl my-4">{title}</h1>
      <div>
        <div className="w-[200px] h-[200px] mt-1 mb-1">
          <canvas style={{ backgroundColor: "" }} ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export default PlaceTravailChart;
