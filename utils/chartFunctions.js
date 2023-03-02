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
    datasets: [{
      label: 'Data',
      data,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
}

