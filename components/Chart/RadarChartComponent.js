import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  generateChartData,
  generateSecuRadialChartData,
} from "../../utils/chartFunctions";
import { generateSecuData } from "../../utils/otherFunctions";

function RadarChartComponent({ formData, step }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const result = generateSecuData(formData);
  console.log(result);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chartData = generateSecuRadialChartData(formData);

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
  }, [formData, step]);

  return (
    <div className="flex flex-col items-center m-2">
      <h1 className="text-3xl">Ma QVT selon mes besoins de Sécurité</h1>
      <div className="w-[500px]">
        <canvas style={{ backgroundColor: "" }} ref={canvasRef} />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <span className="bg-amber-800 text-white px-4 py-0.5">
              HARMONIE
            </span>
            <span className="bg-red-300 text-white px-4 py-0.5">
              {result.Harmonie}%
            </span>
          </div>
          <div className="text-gray-600 italic text-center text-xs">
            Niveau de satisfaction de mes <br /> besoins au travail actuellement
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <span className="bg-amber-800 text-white px-4 py-0.5">
              INDICE QVT
            </span>
            <span className="bg-red-300 text-white px-4 py-0.5">
              {result.QVT}%
            </span>
          </div>
          <br />
          <div className="text-gray-600 italic text-center text-xs">
            La façon dont je me sens <br /> au travail actuellement
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadarChartComponent;
