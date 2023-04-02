import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Description from "./Description";

function RadarChartComponent({
  formData,
  chartFunction,
  chartDataFunction,
  title,
  bgcolor1,
  bgcolor2,
}) {
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
        scales: {
          r: {
            min: 0,
            max: 7,
            ticks: {
              stepSize: 1,
              display: false,
            },
            pointLabels: {
              font: {
                size: 12,
              },
            },
          },
        },
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
    <div className="flex flex-col items-center">
      <h1 className="font-thin text-6xl mt-10 font-MoonTime text-customGray">{title}</h1>
      <div>
        <div className="w-[600px] mt-6 mb-6">
          <canvas style={{ backgroundColor: "" }} ref={canvasRef} />
        </div>
        <div className="text-xs font-semibold text-purple-600 mt-2 mb-7 text-right">❗Besoin asymétrique</div>
      </div>
      <Description
        bgcolor1={bgcolor1}
        bgcolor2={bgcolor2}
        harmonie={result.Harmonie}
        qvt={result.QVT}
      />
    </div>
  );
}

export default RadarChartComponent;
