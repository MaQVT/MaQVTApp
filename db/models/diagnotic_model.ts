import moment from "moment";
import { mongoose } from "../connexion";

let diagnosticSchema = new mongoose.Schema({
  id_user: {
    type: String,
  },
  form_data: {
    securiteOne: {
      ideal: String,
      actu: String,
      vecu: String
    },
    securiteTwo: {
      ideal: String,
      actu: String,
      vecu: String
    },
    securiteThree: {
      ideal: String,
      actu: String,
      vecu: String
    },
    securiteFour: {
      ideal: String,
      actu: String,
      vecu: String
    },
    securiteFive: {
      ideal: String,
      actu: String,
      vecu: String
    },
    securiteSix: {
      ideal: String,
      actu: String,
      vecu: String
    }
  },
  perserve: {
    type: String,
    required: true,
  },
  ameliorate: {
    type: String,
    default: false,
  },
  receive_report: {
    type: Boolean,
    default: false,
  },
  accept_transmission: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: String,
    enum: [1, 2, 3, 4, 5],
    default: 3,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});

export const DiagnosticModel =
  mongoose.models.User || mongoose.model("Diagnostic", diagnosticSchema);
