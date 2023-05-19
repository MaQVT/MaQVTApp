import { useState, useEffect } from "react";
import Step from "./Step";
import ImagePass from "./ImagePass";
import { useRouter } from "next/router";
import DragAndDropForm from "./DragAndDropForm";
import FormVTM1 from "./FormVTM1";
import FormVTM2 from "./FormVTM2";
import FormVTM3 from "./FormVTM3";
import FormAD1 from "./FormAD1";
import FormAD2 from "./FormAD2";
import TextPass from "./TextPass";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [sent, setSent] = useState(false);
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
    // console.log(formData);
    // localStorage.setItem("lastTest", JSON.stringify(formData));
    router.push({
      pathname: "/testqvt/result",
      // query: { formData: JSON.stringify(formData) },
    });
  };
  if (step == 43) {
    handleSubmit();
  }

  if (step == 42 && sent == false) {
    setTimeout(async () => {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ form_data: formData, email: localStorage.getItem("email") }),
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
        localStorage.setItem("lastID", json.data._id)
        setSent(true);
      } else {
        const json = await res.json();
        console.log(json)
      }
    }, 100);
  }

  useEffect(() => {
    // this code will run after the state has been updated
  }, [formData]);

  return (
    <div className="h-full w-full flex-1">
      {step === 1 && (
        <TextPass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          text={<>
            Bienvenue ! <br />
            Vous vous apprêtez à vous offrir un temps précieux d’écoute de vous-même, de votre vécu du travail. Et pour cela, déjà, bravo. <br />
            Vous allez être guidé par une trentaine de questions permettant d’évaluer votre Qualité de Vie au Travail, actuellement. <br />
            Pour que cette expérience vous soit utile : <br />
            1&gt; Répondez avec un maximum d’authenticité <br />
            Vous êtes une personne unique, et personne mieux que vous ne peut savoir ce que vous vivez, ni ce dont vous avez besoin. <br />
            2&gt; Répondez avec un maximum de spontanéité <br />
            Ne cherchez pas à imaginer ce qu’il y a “derrière” chaque question, car il n’y a pas de bonne ou mauvaise réponse, vous avez le droit de penser et ressentir tout ce que vous voulez ! <br />
            C’est à vous… Lancer l’auto-diagnostic <br />
          </>}
          position={0}
        />
      )}

      {step === 2 && (
        <FormAD1
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"demarrer1"}
          titleName={"Avant de Démarrer"}
          position={1}
        />
      )}

      {step === 3 && (
        <FormAD2
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"demarrer2"}
          titleName={"Avant de Démarrer"}
          position={1}
        />
      )}

      {/* Questionnaire pour la partie Vie au Travail et Moi  */}
      {step === 4 && (
        <ImagePass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          image="/vtm.png"
          alt="Image de Vie au Travail et Moi"
          position={1}
        />
      )}

      {step === 5 && (
        <FormVTM1
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"importanceTravail"}
          titleName={"Le travail est-il important pour moi ?"}
          position={1}
          pageNumber={"01"}
        />
      )}

      {step === 6 && (
        <DragAndDropForm
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"roleTravail"}
          titleName={
            "Quelle est la fonction du travail pour moi, de manière générale ?"
          }
          position={1}
          pageNumber={"02"}
        />
      )}

      {step === 7 && (
        <FormVTM2
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"enGeneral"}
          titleName={"De manière générale, ces temps-ci,"}
          position={1}
          pageNumber={"03"}
        />
      )}

      {step === 8 && (
        <FormVTM3
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"cesTemps"}
          titleName={"Ces temps ci,"}
          position={1}
          pageNumber={"04"}
        />
      )}

      {step === 9 && (
        <ImagePass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          image="/diagnostic.png"
          alt="Image de Diagnostic"
          position={1}
        />
      )}

      {/* Questionnaire pour la partie Sécurité */}
      {step === 10 && (
        <TextPass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          text={<>
            <p className="font-PlayfairDisplay uppercase mb-5">Mon besoin de ...</p><br />
            <p className="font-Trocchi text-securite1 text-6xl">Sécurité</p>
          </>}
          position={1}
        />
      )}

      {step === 11 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteOne"}
          titleName={
            "Mon travail contribue à ma sécurité matérielle et à celle de ma famille."
          }
          position={1}
          pageNumber={<span className="text-securite1">01</span>}
        />
      )}
      {step === 12 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteThree"}
          titleName={"Je suis traité·e équitablement."}
          position={1}
          pageNumber={<span className="text-securite1">02</span>}
        />
      )}
      {step === 13 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteFour"}
          titleName={"Mes objectifs et mes tâches sont clairs."}
          position={1}
          pageNumber={<span className="text-securite1">03</span>}
        />
      )}
      {step === 14 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteFive"}
          titleName={"Je suis soutenu·e et j'ai confiance en mes collègues."}
          position={1}
          pageNumber={<span className="text-securite1">04</span>}
        />
      )}
      {step === 15 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteSix"}
          titleName={"Je suis soutenu·e et j'ai confiance en ma hiérarchie."}
          position={1}
          pageNumber={<span className="text-securite1">05</span>}
        />
      )}
      {step === 16 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"securiteTwo"}
          titleName={"Je suis en sécurité dans mon travail."}
          position={1}
          pageNumber={<span className="text-securite1">06</span>}
        />
      )}

      {/* Questionnaire pour la partie Satisfaction */}
      {step === 17 && (
        <TextPass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          text={<>
            <p className="font-PlayfairDisplay uppercase mb-5">Mon besoin de ...</p><br />
            <p className="font-Trocchi text-satisfaction1 text-6xl">Plaisir</p>
          </>}
          position={1}
        />
      )}

      {step === 18 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"satisfactionOne"}
          titleName={"Mon travail me laisse du temps pour ma vie personnelle."}
          position={1}
          pageNumber={<span className="text-satisfaction1">07</span>}
        />
      )}
      {step === 19 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"satisfactionTwo"}
          titleName={"Mes conditions matérielles de travail sont confortables."}
          position={1}
          pageNumber={<span className="text-satisfaction1">08</span>}
        />
      )}
      {step === 20 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"satisfactionThree"}
          titleName={"J’éprouve du plaisir dans mon travail."}
          position={1}
          pageNumber={<span className="text-satisfaction1">09</span>}
        />
      )}
      {step === 21 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"satisfactionFour"}
          titleName={"Le contenu de mon travail est intéressant."}
          position={1}
          pageNumber={<span className="text-satisfaction1">10</span>}
        />
      )}
      {step === 22 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"satisfactionFive"}
          titleName={"Mes relations de travail sont agréables."}
          position={1}
          pageNumber={<span className="text-satisfaction1">11</span>}
        />
      )}

      {/* Questionnaire pour la partie d'Inclusion */}
      {step === 23 && (
        <TextPass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          text={<>
            <p className="font-PlayfairDisplay uppercase mb-5">Mon besoin d&apos; ...</p><br />
            <p className="font-Trocchi text-inclusion1 text-6xl">Inclusion</p>
          </>}
          position={1}
        />
      )}

      {step === 24 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"inclusionOne"}
          titleName={"Je fais partie d’un collectif."}
          position={1}
          pageNumber={<span className="text-inclusion1">12</span>}
        />
      )}
      {step === 25 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"inclusionTwo"}
          titleName={"J’occupe une place claire et respectée."}
          position={1}
          pageNumber={<span className="text-inclusion1">13</span>}
        />
      )}
      {step === 26 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"inclusionThree"}
          titleName={"Je reçois de la reconnaissance."}
          position={1}
          pageNumber={<span className="text-inclusion1">14</span>}
        />
      )}
      {step === 27 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"inclusionFour"}
          titleName={"Je suis apprécié·e en tant que personne."}
          position={1}
          pageNumber={<span className="text-inclusion1">15</span>}
        />
      )}
      {step === 28 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"inclusionFive"}
          titleName={"Je suis estimé·e en tant que professionnel·le."}
          position={1}
          pageNumber={<span className="text-inclusion1">16</span>}
        />
      )}

      {/* Questionnaire pour la partie du Pouvoir d'agir */}
      {step === 29 && (
        <TextPass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          text={<>
            <p className="font-PlayfairDisplay uppercase mb-5">Mon besoin de ...</p><br />
            <p className="font-Trocchi text-pouvoiragir1 text-6xl">Pouvoir agir</p>
          </>}
          position={1}
        />
      )}

      {step === 30 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"pouvoiragirOne"}
          titleName={
            "J’apprends de nouvelles choses et je peux faire évoluer mes compétences."
          }
          position={1}
          pageNumber={<span className="text-pouvoiragir1">17</span>}
        />
      )}
      {step === 31 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"pouvoiragirTwo"}
          titleName={"Je suis autonome et je peux prendre des initiatives."}
          position={1}
          pageNumber={<span className="text-pouvoiragir1">18</span>}
        />
      )}
      {step === 32 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"pouvoiragirThree"}
          titleName={"Je peux m’exprimer et je suis écouté·e."}
          position={1}
          pageNumber={<span className="text-pouvoiragir1">19</span>}
        />
      )}
      {step === 33 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"pouvoiragirFour"}
          titleName={"Je suis libre d’être moi-même au travail."}
          position={1}
          pageNumber={<span className="text-pouvoiragir1">20</span>}
        />
      )}
      {step === 34 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"pouvoiragirFive"}
          titleName={"J’ai des responsabilités."}
          position={1}
          pageNumber={<span className="text-pouvoiragir1">21</span>}
        />
      )}
      {step === 35 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"pouvoiragirSix"}
          titleName={"J’ai des perspectives d’avenir."}
          position={1}
          pageNumber={<span className="text-pouvoiragir1">22</span>}
        />
      )}

      {/* Questionnaire pour la partie de sens */}
      {step === 36 && (
        <TextPass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          text={<>
            <p className="font-PlayfairDisplay uppercase mb-5">Mon besoin de ...</p><br />
            <p className="font-Trocchi text-sens1 text-6xl">Sens</p>
          </>}
          position={1}
        />
      )}

      {step === 37 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"sensOne"}
          titleName={
            "Mon travail a du sens."
          }
          position={1}
          pageNumber={<span className="text-sens1">23</span>}
        />
      )}
      {step === 38 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"sensTwo"}
          titleName={"Je peux agir en conformité avec mes valeurs."}
          position={1}
          pageNumber={<span className="text-sens1">24</span>}
        />
      )}
      {step === 39 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"sensThree"}
          titleName={"Je suis utile."}
          position={1}
          pageNumber={<span className="text-sens1">25</span>}
        />
      )}
      {step === 40 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"sensFour"}
          titleName={"Je suis compétent·e et efficace."}
          position={1}
          pageNumber={<span className="text-sens1">26</span>}
        />
      )}
      {step === 41 && (
        <Step
          handleNext={handleNext}
          handlePrev={handlePrev}
          stepName={"sensFive"}
          titleName={"Je me réalise, je m’accomplis dans mon travail."}
          position={-1}
          pageNumber={<span className="text-sens1">27</span>}
        />
      )}

      {/* Affichage de la partie de demande d'acces au résultat */}
      {step === 42 && (
        <ImagePass
          handleNext={handleNextImage}
          handlePrev={handlePrev}
          image="/resultat.png"
          alt="Image de Resultat"
          position={-1}
        />
      )}
    </div>
  );
}
