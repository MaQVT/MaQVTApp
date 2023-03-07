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
  const securite1 = formData["stepOne"];
  const securite2 = formData["stepTwo"];
  const securite3 = formData["stepThree"];
  const securite4 = formData["stepFour"];
  const securite5 = formData["stepFive"];
  const securite6 = formData["stepSix"];
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
          securite1["q1"],
          securite2["q1"],
          securite3["q1"],
          securite4["q1"],
          securite5["q1"],
          securite6["q1"],
        ],
        fill: true,
        backgroundColor: "rgba(245, 121, 39, 0.0)",
        borderColor: "rgba(245, 121, 39)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actuellement",
        data: [
          securite1["q2"],
          securite2["q2"],
          securite3["q2"],
          securite4["q2"],
          securite5["q2"],
          securite6["q2"],
        ],
        fill: true,
        backgroundColor: "rgba(245, 121, 39, 0.2)",
        borderColor: "rgba(245, 121, 39, 0.2)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Vécu",
        data: [
          securite1["q3"],
          securite2["q3"],
          securite3["q3"],
          securite4["q3"],
          securite5["q3"],
          securite6["q3"],
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.0)",
        borderColor: "rgba(72, 67, 63, 1)",
        borderDash: [5, 10],
        pointBackgroundColor: "rgb(54, 162, 235)",
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
