import { mongoose } from "../connexion";

let diagnosticSchema = new mongoose.Schema({
  id_user: {
    type: String,
  },
  email: {
    type: String,
  },
  form_data: {
    demarrer1: {
      dispo: String,
      motivation: String,
    },
    demarrer2: {
      physique: String,
      emotionnel: String,
    },
    importanceTravail: {
      placeT: String,
      vecuT: String,
    },
    roleTravail: [String],
    enGeneral: {
      sensation: String,
      motivation: String,
      souhait: {
        type: String,
        default: "4",
      }
    },
    cesTemps: {
      vecuS: String,
      vecuP: String,
    },
    securiteOne: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    securiteTwo: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    securiteThree: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    securiteFour: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    securiteFive: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    securiteSix: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    satisfactionOne: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    satisfactionTwo: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    satisfactionThree: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    satisfactionFour: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    satisfactionFive: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    inclusionOne: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    inclusionTwo: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    inclusionThree: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    inclusionFour: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    inclusionFive: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    pouvoiragirOne: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    pouvoiragirTwo: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    pouvoiragirThree: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    pouvoiragirFour: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    pouvoiragirFive: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    pouvoiragirSix: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    sensOne: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    sensTwo: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    sensThree: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    sensFour: {
      ideal: String,
      actu: String,
      vecu: String,
    },
    sensFive: {
      ideal: String,
      actu: String,
      vecu: String,
    },
  },
  // preserve: {
  //   type: [String],
  // },
  // ameliorate: {
  //   type: [String],
  // },
  // preserveAction: {
  //   reponse: [String],
  //   priorite: [String],
  //   qui: [String],
  //   envie: String,
  //   capacite: Boolean
  // },
  // ameliorateAction: {
  //   reponse: [String],
  //   priorite: [String],
  //   qui: [String],
  //   envie: String,
  //   capacite: Boolean
  // },
  frequency: {
    type: String,
    default: "trimestrielle",
  },
  collectiveSynthesis: {
    type: Boolean,
    default: false,
  },
  consultantAccess: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["private", "consultant", "public"],
    default: "private",
    required: false,
  },
  rating: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    default: "3",
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});

export const DiagnosticModel =
  mongoose.models.Diagnostic || mongoose.model("Diagnostic", diagnosticSchema);
