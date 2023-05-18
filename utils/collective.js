export function calculateMeanFormData(formDataList) {
    const meanFormData = {};
  
    const numFormData = formDataList.length;
  
    for (const key in formDataList[0]) {
      if (formDataList[0].hasOwnProperty(key)) {
        if (key === "roleTravail") {
          // Handle roleTravail separately
          const roleTravailCounts = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
          };
  
          for (const formData of formDataList) {
            const roleTravail = formData[key];
            for (let index = 0; index < roleTravail.length; index++) {
                roleTravailCounts[roleTravail[index]] += index;
            }
          }
  
          const sortedRoleTravail = Object.entries(roleTravailCounts)
            .sort(([, count1], [, count2]) => count1 - count2)
            .map(([roleValue]) => roleValue);
  
          meanFormData[key] = sortedRoleTravail;
        } else {
          // Handle all other properties
          const propertySum = {};
  
          for (const formData of formDataList) {
            const propertyValues = formData[key];
  
            for (const propertyKey in propertyValues) {
              if (propertyValues.hasOwnProperty(propertyKey)) {
                const value = parseInt(propertyValues[propertyKey], 10);
                propertySum[propertyKey] = propertySum[propertyKey] ? propertySum[propertyKey] + value : value;
              }
            }
          }
  
          const propertyMean = {};
  
          for (const propertyKey in propertySum) {
            if (propertySum.hasOwnProperty(propertyKey)) {
              const meanValue = Math.round(propertySum[propertyKey] / numFormData);
              propertyMean[propertyKey] = meanValue.toString();
            }
          }
  
          meanFormData[key] = propertyMean;
        }
      }
    }
  
    return meanFormData;
  }
  