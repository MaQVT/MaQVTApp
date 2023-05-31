import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Description from "./Description";

function RadarChartComponent({
  formData,
  chartFunction,
  chartDataFunction,
  chartAsymetriqueFuntion,
  title,
  bgcolor1,
  bgcolor2,
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const result = chartDataFunction(formData);
  const asymetrique = chartAsymetriqueFuntion(formData);
  console.log(result);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chartData = chartFunction(formData);

    if (chartRef.current) {
      // If chart already exists, destroy it
      chartRef.current.destroy();
    }

    const isMobile = window.innerWidth <= 768;

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
                size: isMobile ? 8 : 11,
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
            position: isMobile ? "bottom" : "right",
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
      <h1 className="font-thin text-6xl mt-14 font-MoonTime text-customGray md:text-center sm:text-3xl">{title}</h1>
      <div>
        <div className="w-[600px] mt-6 mb-6 sm:w-[100vw]">
          <canvas style={{ backgroundColor: "" }} ref={canvasRef} />
        </div>
        { asymetrique >= 1 && <div className="text-xs font-semibold text-purple-600 mt-2 mb-7 text-right">❗Besoin asymétrique</div>}
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
