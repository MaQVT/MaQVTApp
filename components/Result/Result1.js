import React from "react";
import ChartComponentRole from "./ChartComponentRole";
import PlaceTravailChart from "./PlaceTravailChart";
import { generateChartPlaceTravailData } from "../../utils/chartFunctions";
import ImageChangingOnValue from "../PlanAction/ImageChangingOnValue";
import { positionEtatPresent, positionNiveauPresence } from "../../utils/otherFunctions";

function Result1({ formData }) {
  return (
    <div className=" w-full h-full flex flex-row justify-around gap-3 font-PlayfairDisplay">
      {/* <h1 className="font-bold text-4xl">Mes resultats</h1> */}
      <div className="flex flex-col justify-around">
        <div className="basis-1/2">
          <h2 className="font-thin text-3xl mt-5 text-red-800 text-center">Avant la passation</h2>
          <div className="flex flex-row flex-1 justify-evenly my-10 gap-10">
            <ImageChangingOnValue
              title={"Mon état présent"}
              subtitle={"physique & émotionnel"}
              images={[
                "/result/LowEtat.png",
                "/result/MiddleEtat.png",
                "/result/HighEtat.png",
              ]}
              position={positionEtatPresent(formData)}
            />
            <ImageChangingOnValue
              title={"Mon niveau de présence"}
              subtitle={"disponibilité & motivation"}
              images={[
                "/result/VeryLowPresence.png",
                "/result/LowPresence.png",
                "/result/MiddlePresence.png",
                "/result/HighPresence.png",
              ]}
              position={positionNiveauPresence(formData)}
            />
          </div>
        </div>
        <PlaceTravailChart
          formData={formData}
          chartFunction={generateChartPlaceTravailData}
          title={
            <>
              <span className="text-blue-600">
                Place du travail dans ma vie
              </span>
              <span className="text-blue-200"> & ressenti</span>
            </>
          }
        />
      </div>
      <div>
        <div className="flex flex-col justify-around">
          <div className="flex justify-center items-center basis-1/2">
            <h3 className="font-thin text-7xl lg:text-9xl mt-10 font-MoonTime text-customGray">Mon autoscopie</h3>
          </div>

          <div className="">
            <div>
              <ChartComponentRole formData={formData} title={<span className="text-[#AA5CB7]">Le role du travail pour moi</span>} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result1;
