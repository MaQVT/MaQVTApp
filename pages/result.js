import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import ChartComponent from "../components/Chart/ChartComponent";
import { useRouter } from "next/router";
import RadarChartComponent from "../components/Chart/RadarChartComponent";

const inter = Inter({ subsets: ["latin"] });

function Result() {
  const router = useRouter();

  console.log(router.query.formData)

  // Parse the formData object from the query string
  const formData = JSON.parse(router.query.formData);

  return (
    <>
      <Head>
        <title>Résultat du Diagnostic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <RadarChartComponent formData={formData} step="stepSix" />
          <ChartComponent formData={formData} step="stepOne" />
          <ChartComponent formData={formData} step="stepTwo" />
          <ChartComponent formData={formData} step="stepThree" />
          <ChartComponent formData={formData} step="stepFour" />
          <ChartComponent formData={formData} step="stepFive" />
        </div>
      </main>
    </>
  );
}

// export async function getStaticProps() {
//   const formData = "";

//   return {
//     props: {
//       formData,
//     },
//   };
// }

export default Result;
