import React from "react";
import ChartComponentRole from "./ChartComponentRole";

function Result1({ formData }) {
  return (
    <div className="flex">
      <div></div>
      <div>
        <div>Mon portrait</div>
        <div>
          <h2>Le role du travail pour moi</h2>
          <div>
            <ChartComponentRole formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result1;
