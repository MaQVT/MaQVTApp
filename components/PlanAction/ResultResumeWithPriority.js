import React from "react";
import SelectionPriorityChart from "./SelectionPriorityChart";
import {
  generateInclusionRadialChartData,
  generatePouvoiragirRadialChartData,
  generateSatisfactionRadialChartData,
  generateSecuRadialChartData,
  generateSensRadialChartData,
} from "../../utils/chartFunctionsPriority";
import PriorityLegend from "./PriorityLegend";

function ResultResumeWithPriority({ formData }) {
  return (
    <div className="flex flex-wrap justify-around">
      <PriorityLegend />
      <SelectionPriorityChart
        formData={formData}
        chartFunction={generateSecuRadialChartData}
        title={"Sécurité"}
        bgcolor1={"bg-securite1"}
        bgcolor2={"bg-securite2"}
      />
      <SelectionPriorityChart
        formData={formData}
        chartFunction={generateSatisfactionRadialChartData}
        title={"Satisfaction"}
        bgcolor1={"bg-satisfaction1"}
        bgcolor2={"bg-satisfaction2"}
      />
      <SelectionPriorityChart
        formData={formData}
        chartFunction={generateInclusionRadialChartData}
        title={"Inclusion"}
        bgcolor1={"bg-inclusion1"}
        bgcolor2={"bg-inclusion2"}
      />
      <SelectionPriorityChart
        formData={formData}
        chartFunction={generatePouvoiragirRadialChartData}
        title={"Pouvoir d'agir"}
        bgcolor1={"bg-pouvoiragir1"}
        bgcolor2={"bg-pouvoiragir2"}
      />
      <SelectionPriorityChart
        formData={formData}
        chartFunction={generateSensRadialChartData}
        title={"Sens"}
        bgcolor1={"bg-sens1"}
        bgcolor2={"bg-sens2"}
      />
    </div>
  );
}

export default ResultResumeWithPriority;
