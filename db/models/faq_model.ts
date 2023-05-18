import { mongoose } from "../connexion";

let userSchema = new mongoose.Schema({
  question: {
    type: String,
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
