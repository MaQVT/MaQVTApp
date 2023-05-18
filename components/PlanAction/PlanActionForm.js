import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProritySelection from "./PrioritySelection";
import ResultResumeWithPriority from "./ResultResumeWithPriority";
import MonPlan from "./MonPlan";
import PlanActionAutorisation from "./PlanActionAutorisation";
import PlanActionRating from "./PlanActionRating";
import ImagePass from "../Form/ImagePass";
import NavigationButton from "../Form/NavigationButton";

export default function PlanActionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(undefined);
  const [otherData, setOtherData] = useState(undefined);
  const router = useRouter();

  const handleNext = (data) => {
    setOtherData({ ...otherData, ...data });
    setStep(step + 1);
    console.log(otherData);
  };

  const handleNextImage = (data) => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
    console.log(otherData);
  };

  if (step == 6) {
    setTimeout(async () => {
      console.log(JSON.stringify({
        form_data: formData,
        ...otherData,
        _id: localStorage.getItem("lastID"),
      }))
      const res = await fetch("/api/diagnostic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          form_data: formData,
          ...otherData,
          _id: localStorage.getItem("lastID"),
        }),
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      } else {
        const json = await res.json();
        console.log(json);
      }
    }, 1000);
  }

  if(step == 7){
    router.push({
      pathname: "/",
    });
  }
  useEffect(() => {
    // this code will run after the state has been updated
    setTimeout(async () => {
      const res = await fetch(
        `/api/diagnostic/id/${localStorage.getItem("lastID")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.ok) {
        const json = await res.json();
        setFormData(json.data.form_data);
        console.log(json.data);
      } else {
        const json = await res.json();
        console.log(json);
      }
    }, 0);
  }, []);

  return (
    formData && (
      <div>
        {step === 1 && (
          <div className="flex flex-col">
            <ResultResumeWithPriority formData={formData} />
            <ProritySelection
              handleNext={handleNext}
              handlePrev={handlePrev}
              stepName={["preserve", "ameliorate"]}
              titleName={"Ma selection de Priorité"}
              position={0}
            />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col">
            <MonPlan
              handleNext={handleNext}
              handlePrev={handlePrev}
              stepName={"preserveAction"}
              titleName={
                <>
                  Mon plan pour{" "}
                  <span className="underline decoration-green-600">
                    préserver
                  </span>
                </>
              }
              subTitle={
                <span className="text-green-600">(Continuer de nourrir)</span>
              }
              columnOneQuestion={
                "Qu'est-ce qui peut m'y aider ? Qu'est-ce qui peut contribuer à y arriver ? Qu'ai-je besoin de continuer à faire ? De quoi ai-je besoin concrètement, de nouveau / différent ?"
              }
              position={1}
            />
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col">
            <MonPlan
              handleNext={handleNext}
              handlePrev={handlePrev}
              stepName={"ameliorateAction"}
              titleName={
                <>
                  Mon plan pour{" "}
                  <span className="underline decoration-red-600">
                    améliorer
                  </span>
                </>
              }
              subTitle={
                <span className="text-red-600">(Mieux prendre soin de)</span>
              }
              columnOneQuestion={
                "Qu'est-ce qui peut m'y aider ? Qu'est-ce qui peut contribuer à y arriver ? Qu'ai-je besoin de faire ? De quoi ai-je besoin concrètement, de nouveau / différent ?"
              }
              position={1}
            />
          </div>
        )}
        {step === 4 && (
          <div className="max-h-[100vh] w-[100vw] overflow-hidden">
            <PlanActionAutorisation
              handleNext={handleNext}
              handlePrev={handlePrev}
              titleName={
                <>
                  {'"""'} Repassez ce test dès que vous en ressentez le besoin, et
                  notamment <br /> lorsque vous vivez un changement
                  dans votre contexte personnel / professionnel. {'"""'} <br />
                  (Vous pouvez paramétrer vos notifications dans votre espace “Mon Compte”)
                </>
              }
              position={1}
            />
          </div>
        )}
        {step === 5 && (
          <div className="flex flex-col">
            <PlanActionRating
              handleNext={handleNext}
              handlePrev={handlePrev}
              titleName={
                <>
                  Comment avez-vous vécu <br /> cette expérience ?
                </>
              }
              position={-1}
            />
          </div>
        )}
        {step === 6 && (
          <div className="max-h-[100vh] w-[100vw] overflow-hidden">
            <ImagePass
              handleNext={handleNextImage}
              handlePrev={handlePrev}
              texteSuivant={"Retourner au Menu Principale"}
              image="/fin.png"
              alt="Image de Fin"
              position={-1}
            />
          </div>
        )}
      </div>
    )
  );
}
