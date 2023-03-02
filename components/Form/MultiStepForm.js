import { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
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
        <StepOne handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 3 && (
        <StepTwo handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 4 && (
        <StepThree handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 5 && (
        <StepFour handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 6 && (
        <StepFive handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 7 && (
        <StepSix handleNext={handleNext} handlePrev={handlePrev} />
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
