import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Description from "./Description";


function RadarChartComponent({ formData, chartFunction, chartDataFunction, title, bgcolor1, bgcolor2 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const result = chartDataFunction(formData);
  console.log(result);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chartData = chartFunction(formData);

    if (chartRef.current) {
      // If chart already exists, destroy it
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "radar",
      data: chartData,
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        plugins:{
          legend: {
            position: "right"
          }
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
    <div className="flex flex-col items-center m-2">
      <h1 className="text-3xl">{title}</h1>
      <div className="w-[500px]">
        <canvas style={{ backgroundColor: "" }} ref={canvasRef} />
      </div>
      <Description bgcolor1={bgcolor1} bgcolor2={bgcolor2} harmonie={result.Harmonie} qvt={result.QVT} />
    </div>
  );
}

export default RadarChartComponent;
