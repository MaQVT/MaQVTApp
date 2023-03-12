const harmonieAndQVT = (data) => {
    let result = [];

    if(data["q1"] == data["q2"]){
        result[0] = 100;
        result[1] = Math.round((Number(data["q3"]) - 1)*(100/7)+result[0]/7);
    }else{
        result[0] = Math.round(Math.abs(Math.abs(Number(data["q1"]) - Number(data["q2"])) - 6)*16.67);
        result[1] = Math.round((Number(data["q3"]) - 1)*(100/7)+result[0]/7);
    }

    return result;
}

export const generateSecuData = (formData) => {
  const securite1 = formData["stepOne"];
  const securite2 = formData["stepTwo"];
  const securite3 = formData["stepThree"];
  const securite4 = formData["stepFour"];
  const securite5 = formData["stepFive"];
  const securite6 = formData["stepSix"];

  const harmQVT1 = harmonieAndQVT(securite1);
  const harmQVT2 = harmonieAndQVT(securite2);
  const harmQVT3 = harmonieAndQVT(securite3);
  const harmQVT4 = harmonieAndQVT(securite4);
  const harmQVT5 = harmonieAndQVT(securite5);
  const harmQVT6 = harmonieAndQVT(securite6);

  const Harmonie = Math.round((harmQVT1[0] + harmQVT2[0] + harmQVT3[0] + harmQVT4[0] + harmQVT5[0] + harmQVT6[0])/6);
  const QVT = Math.round((harmQVT1[1] + harmQVT2[1] + harmQVT3[1] + harmQVT4[1] + harmQVT5[1] + harmQVT6[1])/6);
  const Vecu = (Number(securite1["q3"]) + Number(securite2["q3"]) + Number(securite3["q3"]) + Number(securite4["q3"]) + Number(securite5["q3"]) + Number(securite6["q3"]))/6;

  return {Harmonie, Vecu, QVT}
};
