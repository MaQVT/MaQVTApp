import { mongoose } from "../connexion";

let userSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const FaqModel =
  mongoose.models.Faq || mongoose.model("Faq", userSchema);
