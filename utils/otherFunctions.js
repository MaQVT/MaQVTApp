const harmonieAndQVT = (data) => {
    let result = [];

    if(data["ideal"] == data["actu"]){
        result[0] = 100;
        result[1] = Math.round((Number(data["vecu"]) - 1)*(100/7)+result[0]/7);
    }else{
        result[0] = Math.round(Math.abs(Math.abs(Number(data["ideal"]) - Number(data["actu"])) - 6)*16.67);
        result[1] = Math.round((Number(data["vecu"]) - 1)*(100/7)+result[0]/7);
    }

    return result;
}

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

  const Harmonie = Math.round((harmQVT1[0] + harmQVT2[0] + harmQVT3[0] + harmQVT4[0] + harmQVT5[0] + harmQVT6[0])/6);
  const QVT = Math.round((harmQVT1[1] + harmQVT2[1] + harmQVT3[1] + harmQVT4[1] + harmQVT5[1] + harmQVT6[1])/6);
  const Vecu = (Number(securite1["vecu"]) + Number(securite2["vecu"]) + Number(securite3["vecu"]) + Number(securite4["vecu"]) + Number(securite5["vecu"]) + Number(securite6["vecu"]))/6;

  return {Harmonie, Vecu, QVT}
};
