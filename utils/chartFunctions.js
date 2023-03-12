export const generateChartData = (formData, step) => {
  const data = [];
  const labels = [];

  const stepData = formData[step];
  Object.keys(stepData).forEach((key) => {
    labels.push(key);
    data.push(parseInt(stepData[key]));
  });

  return {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
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
