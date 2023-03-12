import { useState, useEffect } from "react";
import Step from "./Step";
import ImagePass from "./ImagePass";
import { useRouter } from "next/router";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleNextImage = (data) => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    router.push({
      pathname: "/result",
      query: { formData: JSON.stringify(formData) },
    });
  };

  useEffect(() => {
    // this code will run after the state has been updated
    if (step == 8) {
      handleSubmit();
    }
  }, [formData]);

  return (
    <div>
      {step === 1 && (
        <ImagePass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          image="/debut.png"
          alt="Image de Début"
          position={0}
        />
      )}

      {step === 2 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteOne"}
          titleName={"Mon travail contribue à ma sécurité matérielle et à celle de ma famille."}
          position={1}
        />
      )}
      {step === 3 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteTwo"}
          titleName={"Je me sens en sécurité dans mon travail."}
          position={1}
        />
      )}
      {step === 4 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteThree"}
          titleName={"Je suis traité.e équitablement."}
          position={1}
        />
      )}
      {step === 5 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteFour"}
          titleName={"Mes objectifs et mes tâches sont clairs."}
          position={1}
        />
      )}
      {step === 6 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteFive"}
          titleName={"Je suis soutenu.e et j'ai confiance en mes collègues."}
          position={1}
        />
      )}
      {step === 7 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteSix"}
          titleName={"Je suis soutenu.e et j'ai confiance en ma hiérarchie."}
          position={1}
        />
      )}
      {step === 8 && (
        <ImagePass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          image="/result.png"
          alt="Image de Resultat"
          position={-1}
        />
      )}
    </div>
  );
}
