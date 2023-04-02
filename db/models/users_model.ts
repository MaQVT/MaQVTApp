import { mongoose } from "../connexion";

let userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Consultant", "Client", "Manager", "User"],
    default: "User",
    required: true,
  },
  send_mail: {
    type: Boolean,
    default: false,
  },
  expired_date: {
    type: String,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
