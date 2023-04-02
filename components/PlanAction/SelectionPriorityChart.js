import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function SelectionPriorityChart({
  formData,
  chartFunction,
  title,
  bgcolor1,
  bgcolor2,
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
      type: "radar",
      data: chartData,
      plugins: {
        tooltip: {
          callbacks: {
            labelColor: function (context) {
              return {
                borderColor: "rgb(0, 0, 255)",
                backgroundColor: "rgb(255, 0, 0)",
                borderWidth: 2,
                borderDash: [2, 2],
                borderRadius: 2,
              };
            },
            labelTextColor: function (context) {
              return "#543453";
            },
          },
        },
      },
      options: {
        scales: {
          r: {
              min: 0,
              max: 7,
            ticks: {
              stepSize: 1,
              display: false
            },
            pointLabels: {
              font: {
                size: 6
              }
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        plugins: {
          legend: { display: false},
          
          
        },
        
        responsive: false,
        maintainAspectRatio: true,
      },
    });

    // Make sure to return the destroy method on cleanup
    return () => {
      chartRef.current.destroy();
    };
  }, [formData]);

  return (
    <div className={`flex flex-col items-center m-2 p-3 ${bgcolor2}`}>
      <h1 className="text-4xl font-MoonTime text-white">{title}</h1>
      <div className="w-[350px] mt-6 mb-2 bg-white">
        <canvas className="mx-auto" style={{ backgroundColor: "" }} ref={canvasRef} />
      </div>
    </div>
  );
}

export default SelectionPriorityChart;
