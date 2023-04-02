import {
  generateInclusionData,
  generatePouvoiragirData,
  generateSatisfactionData,
  generateSecuData,
  generateSensData,
} from "./otherFunctions";

const preserveAmeliorate = (harmQVT) => {
  let result = "";
  if (harmQVT[0] >= 80 && harmQVT[1] >= 80) result = " 🟢";
  else if (harmQVT[0] <= 17 && harmQVT[1] <= 17) result = " 🔴";
  else result = "";
  return result;
};

 export const besoinAsymetrique = (harmQVT) => {
  let result = "";
  if (harmQVT[0] >= 80 && harmQVT[2] < 4) result = "❗ ";
  else result = "";
  return result;
};

export const generateSecuRadialChartData = (formData) => {
  const securite1 = formData["securiteOne"];
  const securite2 = formData["securiteTwo"];
  const securite3 = formData["securiteThree"];
  const securite4 = formData["securiteFour"];
  const securite5 = formData["securiteFive"];
  const securite6 = formData["securiteSix"];

  const securite = generateSecuData(formData);

  return {
    labels: [
      besoinAsymetrique(securite.Every.harmQVT1) + "Sécurité matérielle" + preserveAmeliorate(securite.Every.harmQVT1),
      besoinAsymetrique(securite.Every.harmQVT2) + "Sentiment sécurité" + preserveAmeliorate(securite.Every.harmQVT2),
      besoinAsymetrique(securite.Every.harmQVT3) + "Equité" + preserveAmeliorate(securite.Every.harmQVT3),
      besoinAsymetrique(securite.Every.harmQVT4) + "Clarté missions" + preserveAmeliorate(securite.Every.harmQVT4),
      besoinAsymetrique(securite.Every.harmQVT5) + "Soutien collègues" + preserveAmeliorate(securite.Every.harmQVT5),
      besoinAsymetrique(securite.Every.harmQVT6) + "Soutien hiérarchie" + preserveAmeliorate(securite.Every.harmQVT6),
    ],
    datasets: [
      {
        label: "Idéal",
        data: [
          securite1["ideal"],
          securite2["ideal"],
          securite3["ideal"],
          securite4["ideal"],
          securite5["ideal"],
          securite6["ideal"],
        ],
        fill: true,
        backgroundColor: "rgba(245, 121, 39, 0.0)",
        borderColor: "rgba(255, 109, 27, 0.5)",
        pointBackgroundColor: "rgb(255, 109, 27, 0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actuellement",
        data: [
          securite1["actu"],
          securite2["actu"],
          securite3["actu"],
          securite4["actu"],
          securite5["actu"],
          securite6["actu"],
        ],
        fill: true,
        backgroundColor: "rgba(248, 203, 173, 0.7)",
        borderColor: "rgba(248, 203, 173, 0.7)",
        pointBackgroundColor: "rgb(248, 203, 173)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Vécu",
        data: [
          securite1["vecu"],
          securite2["vecu"],
          securite3["vecu"],
          securite4["vecu"],
          securite5["vecu"],
          securite6["vecu"],
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.0)",
        borderColor: "rgba(100, 100, 100, 1)",
        borderDash: [5, 10],
        pointBackgroundColor: "rgb(166, 166, 166)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      }
    ],
  };
};

export const generateSatisfactionRadialChartData = (formData) => {
  const satisfaction1 = formData["satisfactionOne"];
  const satisfaction2 = formData["satisfactionTwo"];
  const satisfaction3 = formData["satisfactionThree"];
  const satisfaction4 = formData["satisfactionFour"];
  const satisfaction5 = formData["satisfactionFive"];

  const satisfaction = generateSatisfactionData(formData);

  return {
    labels: [
      besoinAsymetrique(satisfaction.Every.harmQVT1) + "Equilibre de vie" + preserveAmeliorate(satisfaction.Every.harmQVT1),
      besoinAsymetrique(satisfaction.Every.harmQVT2) + "Confort matériel" + preserveAmeliorate(satisfaction.Every.harmQVT2),
      besoinAsymetrique(satisfaction.Every.harmQVT3) + "Plaisir" + preserveAmeliorate(satisfaction.Every.harmQVT3),
      besoinAsymetrique(satisfaction.Every.harmQVT4) + "Intérêt" + preserveAmeliorate(satisfaction.Every.harmQVT4),
      besoinAsymetrique(satisfaction.Every.harmQVT5) + "Qualité relations" + preserveAmeliorate(satisfaction.Every.harmQVT5),
    ],
    datasets: [
      {
        label: "Idéal",
        data: [
          satisfaction1["ideal"],
          satisfaction2["ideal"],
          satisfaction3["ideal"],
          satisfaction4["ideal"],
          satisfaction5["ideal"],
        ],
        fill: true,
        backgroundColor: "rgba(245, 18, 254, 0.0)",
        borderColor: "rgba(245, 18, 254, 0.5)",
        pointBackgroundColor: "rgb(245, 18, 254, 0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actuellement",
        data: [
          satisfaction1["actu"],
          satisfaction2["actu"],
          satisfaction3["actu"],
          satisfaction4["actu"],
          satisfaction5["actu"],
        ],
        fill: true,
        backgroundColor: "rgba(255, 134, 255, 0.7)",
        borderColor: "rgba(255, 134, 255, 0.7)",
        pointBackgroundColor: "rgb(255, 134, 255)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Vécu",
        data: [
          satisfaction1["vecu"],
          satisfaction2["vecu"],
          satisfaction3["vecu"],
          satisfaction4["vecu"],
          satisfaction5["vecu"],
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.0)",
        borderColor: "rgba(100, 100, 100, 1)",
        borderDash: [5, 10],
        pointBackgroundColor: "rgb(166, 166, 166)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      }
    ],
  };
};

export const generateInclusionRadialChartData = (formData) => {
  const inclusion1 = formData["inclusionOne"];
  const inclusion2 = formData["inclusionTwo"];
  const inclusion3 = formData["inclusionThree"];
  const inclusion4 = formData["inclusionFour"];
  const inclusion5 = formData["inclusionFive"];

  const inclusion = generateInclusionData(formData);

  return {
    labels: [
      besoinAsymetrique(inclusion.Every.harmQVT1) + "Sentiment d'appartenance" + preserveAmeliorate(inclusion.Every.harmQVT1),
      besoinAsymetrique(inclusion.Every.harmQVT2) + "Place" + preserveAmeliorate(inclusion.Every.harmQVT2),
      besoinAsymetrique(inclusion.Every.harmQVT3) + "Reconnaissance" + preserveAmeliorate(inclusion.Every.harmQVT3),
      besoinAsymetrique(inclusion.Every.harmQVT4) + "Estime personnelle" + preserveAmeliorate(inclusion.Every.harmQVT4),
      besoinAsymetrique(inclusion.Every.harmQVT5) + "Estime professionnelle" + preserveAmeliorate(inclusion.Every.harmQVT5),
    ],
    datasets: [
      {
        label: "Idéal",
        data: [
          inclusion1["ideal"],
          inclusion2["ideal"],
          inclusion3["ideal"],
          inclusion4["ideal"],
          inclusion5["ideal"],
        ],
        fill: true,
        backgroundColor: "rgba(43, 189, 200, 0.0)",
        borderColor: "rgba(43, 189, 200, 0.5)",
        pointBackgroundColor: "rgb(43, 189, 200, 0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actuellement",
        data: [
          inclusion1["actu"],
          inclusion2["actu"],
          inclusion3["actu"],
          inclusion4["actu"],
          inclusion5["actu"],
        ],
        fill: true,
        backgroundColor: "rgba(128, 229, 235, 0.7)",
        borderColor: "rgba(128, 229, 235, 0.7)",
        pointBackgroundColor: "rgb(128, 229, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Vécu",
        data: [
          inclusion1["vecu"],
          inclusion2["vecu"],
          inclusion3["vecu"],
          inclusion4["vecu"],
          inclusion5["vecu"],
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.0)",
        borderColor: "rgba(100, 100, 100, 1)",
        borderDash: [5, 10],
        pointBackgroundColor: "rgb(166, 166, 166)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      }
    ],
  };
};

export const generatePouvoiragirRadialChartData = (formData) => {
  const pouvoiragir1 = formData["pouvoiragirOne"];
  const pouvoiragir2 = formData["pouvoiragirTwo"];
  const pouvoiragir3 = formData["pouvoiragirThree"];
  const pouvoiragir4 = formData["pouvoiragirFour"];
  const pouvoiragir5 = formData["pouvoiragirFive"];
  const pouvoiragir6 = formData["pouvoiragirSix"];

  const pouvoiragir = generatePouvoiragirData(formData);

  return {
    labels: [
      besoinAsymetrique(pouvoiragir.Every.harmQVT1) + "Apprentissage" + preserveAmeliorate(pouvoiragir.Every.harmQVT1),
      besoinAsymetrique(pouvoiragir.Every.harmQVT2) + "Autonomie" + preserveAmeliorate(pouvoiragir.Every.harmQVT2),
      besoinAsymetrique(pouvoiragir.Every.harmQVT3) + "Expression" + preserveAmeliorate(pouvoiragir.Every.harmQVT3),
      besoinAsymetrique(pouvoiragir.Every.harmQVT4) + "Authenticité" + preserveAmeliorate(pouvoiragir.Every.harmQVT4),
      besoinAsymetrique(pouvoiragir.Every.harmQVT5) + "Responsabilités" + preserveAmeliorate(pouvoiragir.Every.harmQVT5),
      besoinAsymetrique(pouvoiragir.Every.harmQVT6) + "Perspectives" + preserveAmeliorate(pouvoiragir.Every.harmQVT6),
    ],
    datasets: [
      {
        label: "Idéal",
        data: [
          pouvoiragir1["ideal"],
          pouvoiragir2["ideal"],
          pouvoiragir3["ideal"],
          pouvoiragir4["ideal"],
          pouvoiragir5["ideal"],
          pouvoiragir6["ideal"],
        ],
        fill: true,
        backgroundColor: "rgba(0, 74, 173, 0.0)",
        borderColor: "rgba(0, 74, 173, 0.5)",
        pointBackgroundColor: "rgb(0, 74, 173, 0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actuellement",
        data: [
          pouvoiragir1["actu"],
          pouvoiragir2["actu"],
          pouvoiragir3["actu"],
          pouvoiragir4["actu"],
          pouvoiragir5["actu"],
          pouvoiragir6["actu"],
        ],
        fill: true,
        backgroundColor: "rgba(180, 199, 231, 0.7)",
        borderColor: "rgba(180, 199, 231, 0.7)",
        pointBackgroundColor: "rgb(180, 199, 231)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Vécu",
        data: [
          pouvoiragir1["vecu"],
          pouvoiragir2["vecu"],
          pouvoiragir3["vecu"],
          pouvoiragir4["vecu"],
          pouvoiragir5["vecu"],
          pouvoiragir6["vecu"],
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.0)",
        borderColor: "rgba(100, 100, 100, 1)",
        borderDash: [5, 10],
        pointBackgroundColor: "rgb(166, 166, 166)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      }
    ],
  };
};

export const generateSensRadialChartData = (formData) => {
  const sens1 = formData["sensOne"];
  const sens2 = formData["sensTwo"];
  const sens3 = formData["sensThree"];
  const sens4 = formData["sensFour"];
  const sens5 = formData["sensFive"];

  const sens = generateSensData(formData);

  return {
    labels: [
      besoinAsymetrique(sens.Every.harmQVT1) + "Sens" + preserveAmeliorate(sens.Every.harmQVT1),
      besoinAsymetrique(sens.Every.harmQVT2) + "Valeurs" + preserveAmeliorate(sens.Every.harmQVT2),
      besoinAsymetrique(sens.Every.harmQVT3) + "Utilité" + (preserveAmeliorate(sens.Every.harmQVT3)),
      besoinAsymetrique(sens.Every.harmQVT4) + "Compétences" + (preserveAmeliorate(sens.Every.harmQVT4)),
      besoinAsymetrique(sens.Every.harmQVT5) + "Réalisation de soi" + (preserveAmeliorate(sens.Every.harmQVT5)),
    ],
    datasets: [
      {
        label: "Idéal",
        data: [
          sens1["ideal"],
          sens2["ideal"],
          sens3["ideal"],
          sens4["ideal"],
          sens5["ideal"],
        ],
        fill: true,
        backgroundColor: "rgba(106, 39, 145, 0.0)",
        borderColor: "rgba(106, 39, 145, 0.5)",
        pointBackgroundColor: "rgb(106, 39, 145, 0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actuellement",
        data: [
          sens1["actu"],
          sens2["actu"],
          sens3["actu"],
          sens4["actu"],
          sens5["actu"],
        ],
        fill: true,
        backgroundColor: "rgba(171, 92, 184, 0.7)",
        borderColor: "rgba(171, 92, 184, 0.7)",
        pointBackgroundColor: "rgb(171, 92, 184)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Vécu",
        data: [
          sens1["vecu"],
          sens2["vecu"],
          sens3["vecu"],
          sens4["vecu"],
          sens5["vecu"],
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.0)",
        borderColor: "rgba(100, 100, 100, 1)",
        borderDash: [5, 10],
        pointBackgroundColor: "rgb(166, 166, 166)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      }
    ],
  };
};
