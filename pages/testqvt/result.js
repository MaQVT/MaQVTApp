import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import ChartComponent from "../../components/Chart/ChartComponent";
import { useRouter } from "next/router";
import RadarChartComponent from "../../components/Chart/RadarChartComponent";
import {
  generateInclusionRadialChartData,
  generatePouvoiragirRadialChartData,
  generateSatisfactionRadialChartData,
  generateSecuRadialChartData,
  generateSensRadialChartData,
} from "../../utils/chartFunctions";
import {
  asymetriqueInclusion,
  asymetriquePouvoiragir,
  asymetriqueSatisfaction,
  asymetriqueSecurite,
  asymetriqueSens,
  generateInclusionData,
  generatePouvoiragirData,
  generateSatisfactionData,
  generateSecuData,
  generateSensData,
} from "../../utils/otherFunctions";
import { useEffect, useState } from "react";
import NavigationButton from "../../components/Form/NavigationButton";
import ImagePass from "../../components/Form/ImagePass";
import Result3 from "../../components/Result/Result3";
import Result2 from "../../components/Result/Result2";
import Result1 from "../../components/Result/Result1";
import Layout from "../layout"
import cookies from "next-cookies";
import { verifyJwt } from "../../utils/jwt";
import QvtForm from "../../components/Result/AskLastResult";
const inter = Inter({ subsets: ["latin"] });

function Result({ user }) {
  const [formData, setFormData] = useState(undefined);
  const [otherData, setOtherData] = useState(undefined);

  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/",
      // query: { formData: JSON.stringify(formData) },
    });
  };

  if (step == 11) {
    handleSubmit();
  }

  const handleNextData = (data) => {
    setOtherData({ ...otherData, ...data });
    setStep(step + 1);
    // console.log(otherData);
  };

  if (step == 10) {
    setTimeout(async () => {
      // console.log(JSON.stringify({
      //   form_data: formData,
      //   ...otherData,
      //   _id: localStorage.getItem("lastID"),
      // }))
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
        // console.log("OUIIIIIIIIIIIIII")
        // console.log(json);
      } else {
        const json = await res.json();
        // console.log(json);
      }
    }, 1000);
  } 
  // const router = useRouter();

  // console.log(router.query.formData);

  // // Parse the formData object from the query string
  // const formData = JSON.parse(router.query.formData);

  useEffect(() => {
    // this code will run after the state has been updated
    // setFormData(JSON.parse(localStorage.getItem("lastTest")));
    setTimeout(async () => {
      let lastID = localStorage.getItem("lastID");
      const res = await fetch(`/api/diagnostic/id/${lastID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      if (res.ok) {
        const json = await res.json();
        // console.log(json);
        setFormData(json.data.form_data)
      } else {
        const json = await res.json();
        // console.log(json);
      }
    }, 10);
  }, []);

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Résultat du Diagnostic</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {formData && user && (
        <Layout user={user}>
          <main className={styles.main}>
            {step === 1 && (
              <div className="min-h-full w-full flex flex-col">
                <Result1 formData={formData} step="" />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={0}
                />
              </div>
            )}
            {step === 2 && (
              <div className="h-full w-full flex flex-col">
                <Result2 formData={formData} />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 3 && (
              <div className="h-full w-full flex flex-col">
                <Result3 formData={formData} />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 4 && (
              <div className="w-full min-h-[calc(100vh-75px)]">
                <RadarChartComponent
                  formData={formData}
                  chartFunction={generateSecuRadialChartData}
                  chartDataFunction={generateSecuData}
                  chartAsymetriqueFuntion={asymetriqueSecurite}
                  title={
                    <>
                      Ma QVT selon mes besoins de{" "}
                      <span className="text-orange-500">Sécurité</span>
                    </>
                  }
                  bgcolor1={"bg-securite1"}
                  bgcolor2={"bg-securite2"}
                />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 5 && (
              <div className="w-full min-h-[calc(100vh-75px)]">
                <RadarChartComponent
                  formData={formData}
                  chartFunction={generateSatisfactionRadialChartData}
                  chartDataFunction={generateSatisfactionData}
                  chartAsymetriqueFuntion={asymetriqueSatisfaction}
                  title={
                    <>
                      Ma QVT selon mes besoins de{" "}
                      <span className="text-fuchsia-600">Plaisir</span>
                    </>
                  }
                  bgcolor1={"bg-satisfaction1"}
                  bgcolor2={"bg-satisfaction2"}
                />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 6 && (
              <div className="w-full min-h-[calc(100vh-75px)]">
                <RadarChartComponent
                  formData={formData}
                  chartFunction={generateInclusionRadialChartData}
                  chartDataFunction={generateInclusionData}
                  chartAsymetriqueFuntion={asymetriqueInclusion}
                  title={
                    <>
                      Ma QVT selon mes besoins d&apos;
                      <span className="text-inclusion1">Inclusion</span>
                    </>
                  }
                  bgcolor1={"bg-inclusion1"}
                  bgcolor2={"bg-inclusion2"}
                />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 7 && (
              <div className="w-full min-h-[calc(100vh-75px)]">
                <RadarChartComponent
                  formData={formData}
                  chartFunction={generatePouvoiragirRadialChartData}
                  chartDataFunction={generatePouvoiragirData}
                  chartAsymetriqueFuntion={asymetriquePouvoiragir}
                  title={
                    <>
                      Ma QVT selon mes besoins de{" "}
                      <span className="text-sky-700">Pouvoir d&apos;agir</span>
                    </>
                  }
                  bgcolor1={"bg-pouvoiragir1"}
                  bgcolor2={"bg-pouvoiragir2"}
                />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 8 && (
              <div className="w-full min-h-[calc(100vh-75px)]">
                <RadarChartComponent
                  formData={formData}
                  chartFunction={generateSensRadialChartData}
                  chartDataFunction={generateSensData}
                  chartAsymetriqueFuntion={asymetriqueSens}
                  title={
                    <>
                      Ma QVT selon mes besoins de{" "}
                      <span className="text-sens1">Sens</span>
                    </>
                  }
                  bgcolor1={"bg-sens1"}
                  bgcolor2={"bg-sens2"}
                />
                <NavigationButton
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  position={1}
                />
              </div>
            )}
            {step === 9 && (
              <div className="w-full min-h-[calc(100vh-75px)]">
              <QvtForm
                handleNext={handleNextData}
                handlePrev={handlePrev}
                position={-1}
                user={user}
              />
            </div>
            )}
            {step === 10 && (
              <ImagePass
                handlePrev={handlePrev}
                handleNext={handleNext}
                image={"/fin.png"}
                alt={"Image de Fin"}
                position={-1}
                texteSuivant={"Retourner au Menu Principal"}
              />
            )}
            <div className="flex flex-wrap justify-around items-center gap-10"></div>
          </main>
        </Layout>
      )}
    </div>
  );
}

export default Result;

export async function getServerSideProps(context) {
  const token = cookies(context).token;
  const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";

  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  let userResponseJson = { data: {} };

  if (userResponse.ok) {
    userResponseJson = await userResponse.json();
  }

  return {
    props: { user: userResponseJson.data }, // will be passed to the page component as props
  };
}