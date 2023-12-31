import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import ChartComponent from "../../../components/Chart/ChartComponent";
import { useRouter } from "next/router";
import RadarChartComponent from "../../../components/Chart/RadarChartComponent";
import {
  generateInclusionRadialChartData,
  generatePouvoiragirRadialChartData,
  generateSatisfactionRadialChartData,
  generateSecuRadialChartData,
  generateSensRadialChartData,
} from "../../../utils/chartFunctions";
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
} from "../../../utils/otherFunctions";
import { useEffect, useState } from "react";
import NavigationButton from "../../../components/Form/NavigationButton";
import ImagePass from "../../../components/Form/ImagePass";
import Result3 from "../../../components/Result/Result3";
import Result2 from "../../../components/Result/Result2";
import Result1 from "../../../components/Result/Result1";
import Layout from "../../layout"
import cookies from "next-cookies";
import { verifyJwt } from "../../../utils/jwt";
import moment from "moment";
const inter = Inter({ subsets: ["latin"] });

function Result({ user, formDataInitial }) {

  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState(formDataInitial.form_data)
  const [date, setDate] = useState(formDataInitial.date)
  const [allDiagnostics, setAllDiagnostics] = useState([]);

  const handleNext = () => {
    setFormData(formDataInitial.form_data);
    setDate(formDataInitial.date);
    setStep(step + 1);
  };

  const handlePrev = () => {
    setFormData(formDataInitial.form_data);
    setDate(formDataInitial.date);
    setStep(step - 1);
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/result/consultant",
    });
  };

  if (step == 10) {
    handleSubmit();
  }

  const handleClick = (value) => {
    setFormData(value.form_data);
    setDate(value.date);
  };

  useEffect(() => {
    const sortedDiagnostics = JSON.parse(localStorage.getItem("allDiagnostics")).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return -(dateA - dateB);
    });
    setAllDiagnostics(sortedDiagnostics);
  }, [])

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Résultat du Diagnostic</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {formData && user && (
        <Layout user={user}>
          {allDiagnostics.length > 0 && <div className="flex flex-row w-full mt-1 absolute justify-around flex-wrap gap-1 md:relative">
              {allDiagnostics.map((obj) => (
                <button
                  className={`text-xs w-[75px] p-1 ${date == obj.date ? "bg-green-800" : ""}`}
                  key={obj._id}
                  onClick={() => handleClick(obj)}
                >
                  {moment(obj.date).format("DD/MM/YYYY HH:mm:ss")}
                </button>
              ))}
            </div>}
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
              <div className="w-full h-[calc(100vh-75px)]">
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
              <div className="w-full h-[calc(100vh-75px)]">
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
              <div className="w-full h-[calc(100vh-75px)]">
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
              <div className="w-full h-[calc(100vh-75px)]">
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
              <div className="w-full h-[calc(100vh-75px)]">
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
              <ImagePass
                handlePrev={handlePrev}
                handleNext={handleNext}
                image={"/fin.png"}
                alt={"Image de Fin"}
                position={-1}
                texteSuivant={"Retourner à la liste des utilisateurs"}
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
    const { id } = context.params;
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

    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/diagnostic/id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let diagnosticResponseJson = { data: {} };

    if (diagnosticResponse.ok) {
        diagnosticResponseJson = await diagnosticResponse.json();
    }

    return {
        props: { user: userResponseJson.data, formDataInitial: diagnosticResponseJson.data }, // will be passed to the page component as props
    };
}