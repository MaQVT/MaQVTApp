const harmonieAndQVT = (data) => {
  let result = [];

  if (data["ideal"] == data["actu"]) {
    result[0] = 100;
    result[1] = Math.round(
      (Number(data["vecu"]) - 1) * (100 / 7) + result[0] / 7
    );
  } else {
    result[0] = Math.round(
      Math.abs(Math.abs(Number(data["ideal"]) - Number(data["actu"])) - 6) *
        16.67
    );
    result[1] = Math.round(
      (Number(data["vecu"]) - 1) * (100 / 7) + result[0] / 7
    );
  }

  return result;
};

export const generateSecuData = (formData) => {
  const securite1 = formData["securiteOne"];
  const securite2 = formData["securiteTwo"];
  const securite3 = formData["securiteThree"];
  const securite4 = formData["securiteFour"];
  const securite5 = formData["securiteFive"];
  const securite6 = formData["securiteSix"];

  const harmQVT1 = harmonieAndQVT(securite1);
  const harmQVT2 = harmonieAndQVT(securite2);
  const harmQVT3 = harmonieAndQVT(securite3);
  const harmQVT4 = harmonieAndQVT(securite4);
  const harmQVT5 = harmonieAndQVT(securite5);
  const harmQVT6 = harmonieAndQVT(securite6);

  const Harmonie = Math.round(
    (harmQVT1[0] +
      harmQVT2[0] +
      harmQVT3[0] +
      harmQVT4[0] +
      harmQVT5[0] +
      harmQVT6[0]) /
      6
  );
  const QVT = Math.round(
    (harmQVT1[1] +
      harmQVT2[1] +
      harmQVT3[1] +
      harmQVT4[1] +
      harmQVT5[1] +
      harmQVT6[1]) /
      6
  );
  const Vecu =
    (Number(securite1["vecu"]) +
      Number(securite2["vecu"]) +
      Number(securite3["vecu"]) +
      Number(securite4["vecu"]) +
      Number(securite5["vecu"]) +
      Number(securite6["vecu"])) /
    6;

  return { Harmonie, Vecu, QVT };
};

export const generateSatisfactionData = (formData) => {
  const satisfaction1 = formData["satisfactionOne"];
  const satisfaction2 = formData["satisfactionTwo"];
  const satisfaction3 = formData["satisfactionThree"];
  const satisfaction4 = formData["satisfactionFour"];
  const satisfaction5 = formData["satisfactionFive"];

  const harmQVT1 = harmonieAndQVT(satisfaction1);
  const harmQVT2 = harmonieAndQVT(satisfaction2);
  const harmQVT3 = harmonieAndQVT(satisfaction3);
  const harmQVT4 = harmonieAndQVT(satisfaction4);
  const harmQVT5 = harmonieAndQVT(satisfaction5);

  const Harmonie = Math.round(
    (harmQVT1[0] + harmQVT2[0] + harmQVT3[0] + harmQVT4[0] + harmQVT5[0]) / 5
  );
  const QVT = Math.round(
    (harmQVT1[1] + harmQVT2[1] + harmQVT3[1] + harmQVT4[1] + harmQVT5[1]) / 5
  );
  const Vecu =
    (Number(satisfaction1["vecu"]) +
      Number(satisfaction2["vecu"]) +
      Number(satisfaction3["vecu"]) +
      Number(satisfaction4["vecu"]) +
      Number(satisfaction5["vecu"])) /
    5;

  return { Harmonie, Vecu, QVT };
};

export const generateInclusionData = (formData) => {
  const inclusion1 = formData["inclusionOne"];
  const inclusion2 = formData["inclusionTwo"];
  const inclusion3 = formData["inclusionThree"];
  const inclusion4 = formData["inclusionFour"];
  const inclusion5 = formData["inclusionFive"];

  const harmQVT1 = harmonieAndQVT(inclusion1);
  const harmQVT2 = harmonieAndQVT(inclusion2);
  const harmQVT3 = harmonieAndQVT(inclusion3);
  const harmQVT4 = harmonieAndQVT(inclusion4);
  const harmQVT5 = harmonieAndQVT(inclusion5);

  const Harmonie = Math.round(
    (harmQVT1[0] + harmQVT2[0] + harmQVT3[0] + harmQVT4[0] + harmQVT5[0]) / 5
  );
  const QVT = Math.round(
    (harmQVT1[1] + harmQVT2[1] + harmQVT3[1] + harmQVT4[1] + harmQVT5[1]) / 5
  );
  const Vecu =
    (Number(inclusion1["vecu"]) +
      Number(inclusion2["vecu"]) +
      Number(inclusion3["vecu"]) +
      Number(inclusion4["vecu"]) +
      Number(inclusion5["vecu"])) /
    5;

  return { Harmonie, Vecu, QVT };
};

export const generatePouvoiragirData = (formData) => {
  const pouvoiragir1 = formData["pouvoiragirOne"];
  const pouvoiragir2 = formData["pouvoiragirTwo"];
  const pouvoiragir3 = formData["pouvoiragirThree"];
  const pouvoiragir4 = formData["pouvoiragirFour"];
  const pouvoiragir5 = formData["pouvoiragirFive"];
  const pouvoiragir6 = formData["pouvoiragirSix"];

  const harmQVT1 = harmonieAndQVT(pouvoiragir1);
  const harmQVT2 = harmonieAndQVT(pouvoiragir2);
  const harmQVT3 = harmonieAndQVT(pouvoiragir3);
  const harmQVT4 = harmonieAndQVT(pouvoiragir4);
  const harmQVT5 = harmonieAndQVT(pouvoiragir5);
  const harmQVT6 = harmonieAndQVT(pouvoiragir6);

  const Harmonie = Math.round(
    (harmQVT1[0] +
      harmQVT2[0] +
      harmQVT3[0] +
      harmQVT4[0] +
      harmQVT5[0] +
      harmQVT6[0]) /
      6
  );
  const QVT = Math.round(
    (harmQVT1[1] +
      harmQVT2[1] +
      harmQVT3[1] +
      harmQVT4[1] +
      harmQVT5[1] +
      harmQVT6[1]) /
      6
  );
  const Vecu =
    (Number(pouvoiragir1["vecu"]) +
      Number(pouvoiragir2["vecu"]) +
      Number(pouvoiragir3["vecu"]) +
      Number(pouvoiragir4["vecu"]) +
      Number(pouvoiragir5["vecu"]) +
      Number(pouvoiragir6["vecu"])) /
    6;

  return { Harmonie, Vecu, QVT };
};

export const generateSensData = (formData) => {
  const sens1 = formData["sensOne"];
  const sens2 = formData["sensTwo"];
  const sens3 = formData["sensThree"];
  const sens4 = formData["sensFour"];
  const sens5 = formData["sensFive"];

  const harmQVT1 = harmonieAndQVT(sens1);
  const harmQVT2 = harmonieAndQVT(sens2);
  const harmQVT3 = harmonieAndQVT(sens3);
  const harmQVT4 = harmonieAndQVT(sens4);
  const harmQVT5 = harmonieAndQVT(sens5);

  const Harmonie = Math.round(
    (harmQVT1[0] + harmQVT2[0] + harmQVT3[0] + harmQVT4[0] + harmQVT5[0]) / 5
  );
  const QVT = Math.round(
    (harmQVT1[1] + harmQVT2[1] + harmQVT3[1] + harmQVT4[1] + harmQVT5[1]) / 5
  );
  const Vecu =
    (Number(sens1["vecu"]) +
      Number(sens2["vecu"]) +
      Number(sens3["vecu"]) +
      Number(sens4["vecu"]) +
      Number(sens5["vecu"])) /
    5;

  return { Harmonie, Vecu, QVT };
};

export const generateTotalData = (formData) => {
  const securite = generateSecuData(formData);
  const satisfaction = generateSatisfactionData(formData);
  const inclusion = generateInclusionData(formData);
  const pouvoiragir = generatePouvoiragirData(formData);
  const sens = generateSensData(formData);

  let countGrise = 0;
  for (const key in formData) {
    if (Object.hasOwnProperty.call(formData, key)) {
      const field = formData[key];
      if (field.ideal === "4") {
        countGrise++;
      }
      if (field.actu === "4") {
        countGrise++;
      }
      if (field.vecu === "4") {
        countGrise++;
      }
    }
  }

  const Harmonie = Math.round((securite.Harmonie + satisfaction.Harmonie + inclusion.Harmonie + pouvoiragir.Harmonie + sens.Harmonie)/5);
  const QVT = Math.round((securite.QVT + satisfaction.QVT + inclusion.QVT + pouvoiragir.QVT + sens.QVT)/5);
  const Grise = Math.round(100*countGrise/(27*3));

  return { Harmonie, QVT, Grise };
};