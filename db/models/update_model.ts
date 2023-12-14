import { mongoose } from "../connexion";

let updateSchema = new mongoose.Schema({
  disponible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
});

export const UpdateModel = mongoose.models.Update || mongoose.model("Update", updateSchema);
