import { generateInclusionData, generatePouvoiragirData, generateSatisfactionData, generateSecuData, generateSensData } from "./otherFunctions";

export const generateChartData = (formData, step) => {
  const securite = generateSecuData(formData);
  const satisfaction = generateSatisfactionData(formData);
  const inclusion = generateInclusionData(formData);
  const pouvoiragir = generatePouvoiragirData(formData);
  const sens = generateSensData(formData);

  return {
    labels: ["1 - SECURITE", "2 - SATISFACTION", "3 - INCLUSION", "4 - POUVOIR D'AGIR", "5 - SENS"],
    datasets: [
      {
        type: "bar",
        label: "Indice QVT",
        data: [securite.QVT, satisfaction.QVT, inclusion.QVT, pouvoiragir.QVT, sens.QVT],
        borderColor: "white",
        backgroundColor: [
					'#ED7D31',
					'#DF02FF',
					'#2BBCC8',
					'#4472C4',
					'#6F30A0',
				],
        borderWidth: 3,
        order: 2
      },
      {
        type: "line",
        label: "Harmonie",
        data: [securite.Harmonie, satisfaction.Harmonie, inclusion.Harmonie, pouvoiragir.Harmonie, sens.Harmonie],
        fill: false,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
        pointBackgroundColor: "rgb(255, 255, 255, 1)",
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        order: 1
      },
    ],
  };
};

export const generateChartRoleData = (formData) => {
  const data = formData["roleTravail"];

  const titre = ["MATERIEL", "LIEN SOCIAL", "IDENTITAIRE", "REALISATION DE SOI", "SOCIETAL"]

  return {
    labels: [titre[Number(data[3]) - 1], titre[Number(data[1]) - 1], titre[Number(data[0]) - 1], titre[Number(data[2]) - 1], titre[Number(data[4]) - 1]],
    datasets: [
      {
        type: "bar",
        label: "Le rôle du travail pour moi",
        data: [2, 4, 5, 3, 1],
        borderColor: "white",
        backgroundColor: [
					'#ED7D31',
					'#DF02FF',
					'#2BBCC8',
					'#4472C4',
					'#6F30A0',
				],
        borderWidth: 3,
        order: 2
      }
    ],
  };
};

export const generateSecuRadialChartData = (formData) => {
  const securite1 = formData["securiteOne"];
  const securite2 = formData["securiteTwo"];
  const securite3 = formData["securiteThree"];
  const securite4 = formData["securiteFour"];
  const securite5 = formData["securiteFive"];
  const securite6 = formData["securiteSix"];
  return {
    labels: [
      "Sécurité matérielle",
      "Sentiment sécurité",
      "Equité",
      "Clarté missions",
      "Soutien collègues",
      "Soutien hiérarchie",
    ],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
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
      },
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
    ],
  };
};

export const generateSatisfactionRadialChartData = (formData) => {
  const satisfaction1 = formData["satisfactionOne"];
  const satisfaction2 = formData["satisfactionTwo"];
  const satisfaction3 = formData["satisfactionThree"];
  const satisfaction4 = formData["satisfactionFour"];
  const satisfaction5 = formData["satisfactionFive"];
  return {
    labels: [
      "Equilibre de vie",
      "Confort matériel",
      "Plaisir",
      "Intérêt",
      "Qualité relations",
    ],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
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
      },
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
    ],
  };
};

export const generateInclusionRadialChartData = (formData) => {
  const inclusion1 = formData["inclusionOne"];
  const inclusion2 = formData["inclusionTwo"];
  const inclusion3 = formData["inclusionThree"];
  const inclusion4 = formData["inclusionFour"];
  const inclusion5 = formData["inclusionFive"];
  return {
    labels: [
      "Sentiment d'appartenance",
      "Place",
      "Reconnaissance",
      "Estime personnelle",
      "Estime professionnelle",
    ],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
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
      },
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
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
  return {
    labels: [
      "Apprentissage",
      "Autonomie",
      "Expression",
      "Authenticité",
      "Responsabilités",
      "Perspectives",
    ],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
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
      },
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
    ],
  };
};

export const generateSensRadialChartData = (formData) => {
  const sens1 = formData["sensOne"];
  const sens2 = formData["sensTwo"];
  const sens3 = formData["sensThree"];
  const sens4 = formData["sensFour"];
  const sens5 = formData["sensFive"];
  return {
    labels: ["Sens", "Valeurs", "Utilité", "Compétences", "Réalisation de soi"],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
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
      },
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "rgba(0, 0, 0, 0.0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        fill: true,
        pointRadius: 0,
        showTooltip: false,
        showLine: false,
        hoverOffset: 0,
        pointHoverRadius: 0,
        hoverRadius: 0,
        pointHitRadius: 0,
        spanGaps: true,
        hideInLegendAndTooltip: true,
      },
    ],
  };
};
