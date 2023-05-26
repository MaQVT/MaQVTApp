import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import RadarChartComponent from "../../../../components/Chart/RadarChartComponent";
import {
  generateInclusionRadialChartData,
  generatePouvoiragirRadialChartData,
  generateSatisfactionRadialChartData,
  generateSecuRadialChartData,
  generateSensRadialChartData,
} from "../../../../utils/chartFunctions";
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
} from "../../../../utils/otherFunctions";
import { useEffect, useState } from "react";
import Result3 from "../../../../components/Result/Result3";
import Result2 from "../../../../components/Result/Result2";
import Result1 from "../../../../components/Result/Result1";
import cookies from "next-cookies";
import { verifyJwt } from "../../../../utils/jwt";
const inter = Inter({ subsets: ["latin"] });

function ResultDownload({ user, formDataInitial }) {
  const [formData, setFormData] = useState(formDataInitial.form_data);

    useEffect(() => {
        if(formData) {
            setTimeout(() => {
            window.print()
            }, 500);
        }
    }, [formData]);

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Résultat du Diagnostic Collective</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
            @page {
              size: tabloid;
              margin: 0;
            }
            @media print {
              @page {
                size: tabloid;
              }
            }
          `}
        </style>
      </Head>

      {formData && user && (
        // <Layout user={user}>
        <main className={`${styles.main} flex-col bg-[#F9EEE8]`} id="toBeDownloaded">
          <div className="w-full h-screen flex items-center justify-center font-semibold font-AnticDidone text-3xl p-80 text-center flex-col gap-10"><span className="text-7xl">Résultat QVT Collective</span> <span className="text-green-900">{user.username}</span></div>
          <div className="min-h-screen w-full flex items-center justify-center">
            <Result1 formData={formData} step="" />
          </div>
          <div className="h-screen w-full flex items-center justify-center">
            <Result2 formData={formData} />
          </div>
          <div className="h-screen w-full flex items-center justify-center">
            <Result3 formData={formData} collective={true} />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <RadarChartComponent
              formData={formData}
              chartFunction={generateSecuRadialChartData}
              chartDataFunction={generateSecuData}
              chartAsymetriqueFuntion={asymetriqueSecurite}
              title={
                <>
                  Ma QVT Collective selon mes besoins de{" "}
                  <span className="text-orange-500">Sécurité</span>
                </>
              }
              bgcolor1={"bg-securite1"}
              bgcolor2={"bg-securite2"}
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <RadarChartComponent
              formData={formData}
              chartFunction={generateSatisfactionRadialChartData}
              chartDataFunction={generateSatisfactionData}
              chartAsymetriqueFuntion={asymetriqueSatisfaction}
              title={
                <>
                  Ma QVT Collective selon mes besoins de{" "}
                  <span className="text-fuchsia-600">Plaisir</span>
                </>
              }
              bgcolor1={"bg-satisfaction1"}
              bgcolor2={"bg-satisfaction2"}
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <RadarChartComponent
              formData={formData}
              chartFunction={generateInclusionRadialChartData}
              chartDataFunction={generateInclusionData}
              chartAsymetriqueFuntion={asymetriqueInclusion}
              title={
                <>
                  Ma QVT Collective selon mes besoins d&apos;
                  <span className="text-inclusion1">Inclusion</span>
                </>
              }
              bgcolor1={"bg-inclusion1"}
              bgcolor2={"bg-inclusion2"}
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <RadarChartComponent
              formData={formData}
              chartFunction={generatePouvoiragirRadialChartData}
              chartDataFunction={generatePouvoiragirData}
              chartAsymetriqueFuntion={asymetriquePouvoiragir}
              title={
                <>
                  Ma QVT Collective selon mes besoins de{" "}
                  <span className="text-sky-700">Pouvoir d&apos;agir</span>
                </>
              }
              bgcolor1={"bg-pouvoiragir1"}
              bgcolor2={"bg-pouvoiragir2"}
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center">
            <RadarChartComponent
              formData={formData}
              chartFunction={generateSensRadialChartData}
              chartDataFunction={generateSensData}
              chartAsymetriqueFuntion={asymetriqueSens}
              title={
                <>
                  Ma QVT Collective selon mes besoins de{" "}
                  <span className="text-sens1">Sens</span>
                </>
              }
              bgcolor1={"bg-sens1"}
              bgcolor2={"bg-sens2"}
            />
          </div>
          <div className="w-full h-screen flex items-center justify-center font-semibold font-AnticDidone text-3xl p-80 text-center">“Propulsé par “Ma QVT”, la Webapp de WUNJO. - Ce document est strictement confidentiel, pour préserver l&apos;intimité de l&apos;audité.e et les droits d&apos;auteur de WUNJO”
          </div>
        </main>
        // </Layout>
      )}
    </div>
  );
}

export default ResultDownload;

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
  
    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/coldiagnostic/id/${id}`, {
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