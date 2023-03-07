import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  generateChartData,
  generateSecuRadialChartData,
} from "../../utils/chartFunctions";

function RadarChartComponent({ formData, step }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

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
        }
      },
    });

    // Make sure to return the destroy method on cleanup
    return () => {
      chartRef.current.destroy();
    };
  }, [formData, step]);

  return <canvas style={{backgroundColor: ""}} ref={canvasRef} className="w-[600px]" />;
}

export default RadarChartComponent;
