import moment from "moment";
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
  parentId:{
    type:String,
    required:true,
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
  delay_mail:{
    type:String,
    enum:["hebdomadaire","mensuelle","trimestrielle","annuelle","jamais"],
    required:false,
    default:"jamais"
  },
  expired_date: {
    type: String,
    required: true, 
    default: moment(new Date(Date.now()).setFullYear(new Date().getFullYear() + 1)).format("MM/DD/YYYY HH:mm:ss")
  },
  status:{
    type: String,
    enum:["valide","invalide"],
    default: "invalide",
    required: true
  },
  nb_access:{
    type: Number,  
    default: -1,
  },
  nb_connexion:{
    type: Number,  
    default: 0,
  }
});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
