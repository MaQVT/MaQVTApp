import { NextApiRequest, NextApiResponse } from "next";
import {
  addUser,
  getAllUsers,
  getAllManagers,
  getUserByMail,
  deleteUserByEmail,
  getUserById,
  getUserByStatus,
  updateUserProfile,
  getUsersByParents,
  getAllUsersByRole,
  UpdateByIdUser
} from "../db/handlers/users_handlers";
import moment from "moment";
import {
  addUserValidator,
  deleteUserByEmailValidator,
  deleteUserByIdValidator,
  updateUserValidator,
} from "../db/validators/users_validators";
import { getMailTemplate } from "../utils/getMailTemplate";
import { sendEmail } from "../utils/sendMail";
import { verifyJwt } from "../utils/jwt";
import { hashPassword,verifyPassword } from "../utils/hash";

export const getAllUsersRoute = async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.json({ data: users, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const getUserByStatusRoute = async (req,res)=>{
  try {
    let {status} = req.query
    const users = await getUserByStatus(status);
    console.log(users);
    res.json({ data: users, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
}
export const UpdatePasswordRoute = async(req,res)=>{
  try {
    let {oldPassword,newPassword} = req.body
    let {id} = req.query
    // console.log("###################");
    // console.log(oldPassword,newPassword);
    //recuperer le user
    let user = await getUserById(id)
    console.log(verifyPassword(oldPassword,user.password));
    if(verifyPassword(oldPassword,user.password)){
      user = await UpdateByIdUser(user._id,{password:hashPassword(newPassword)})
      res.json({data:user,message:"Modifications reussie"})
    }else{
      res.status(401).send({message:"Ancien mot de passe incorrect"})
      //throw new Error("Mot de passe incorrect")
    }
    //ajouter le nouveau
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
}

export const getUserByRole = async (req, res) => {
  try {
    const {role} = req.query
    const users = await getAllUsersByRole(role);
    console.log(users);
    res.json({ data: users, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
export const UpdateByIdUserRoute = async (req,res)=>{
  try {
    const {id} = req.query
    let user = await UpdateByIdUser(id,{...req.body})
    res.json({data:user,message:"Données envoyées"})
  } catch (error) {
    res
      .status(500)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
}
export const getUserFilsRoute = async(req,res)=>{
  try {
    const {parent} = req.query
    const users = await getUsersByParents(parent);
    console.log("I am the parent")
    console.log(users)
    res.json({ data: users, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
}

export const getAllManagersRoute = async (req, res) => {
  try {
    // const { id } = req.query;
    const users = await getAllManagers();
    res.json({ data: users, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const deleteUserRoute = async (req, res) => {
  console.log("BODY : " + req.body._id);
  try {
    if (req.body.email != undefined) {
      if (deleteUserByEmailValidator.validate(req.body).error) {
        console.log(deleteUserByEmailValidator.validate(req.body).error);
        throw new Error("Données insuffisantes");
      }
    } else if (req.body.id != undefined) {
      if (deleteUserByIdValidator.validate(req.body).error) {
        console.log(deleteUserByIdValidator.validate(req.body).error);
        throw new Error("Données insuffisantes");
      }
    }

    let user;
    if (req.body.email) {
      user = await getUserByMail(req.body.email);
    } else {
      user = await getUserById(req.body._id);
    }
    console.log(user);
    if (user) {
      await deleteUserByEmail(user.email);
      res
        .status(200)
        .json({ data: req.body.email, message: "Données envoyées" });
    } else {
      res.status(400).json({ data: false, message: "Utilisateur inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const addUserRoute = async (req, res) => {
  try {
    req.body.date = moment(moment.now()).utcOffset('+02:00').format("MM/DD/YYYY HH:mm:ss");
    if (!req.body.password) { req.body.password = hashPassword("2023"); }
    else { req.body.password = hashPassword(req.body.password) }
    let validationError = addUserValidator.validate(req.body).error
    console.log(req.body);
    console.log(validationError);
    if (validationError) {
      throw new Error("Données insuffisantes");
    } else {
      let user = await getUserByMail(req.body.email);
      if (user) {
        res.status(400).json({
          data: false,
          message: "Utilisateur avec cet adresse mail déjà existant",
        });
      } else {
        user = await addUser(req.body);
        const text = getMailTemplate(
          "Compte créé sur l’Application MAQVT",
          `Bonjour, <br /><br />Voici les informations relatives à votre compte sur l’Application “Ma QVT”. <br /><br />Votre email : ${req.body.email}<br />Votre mot de passe : 2023<br /><br />(N’hésitez pas à le personnaliser lors de votre 1ère connexion) <br />Veuillez cliquer sur le lien ci-dessous :`,
          process.env.NEXT_PUBLIC_APP_URL,
          "Accéder à l’Application MAQVT",
          ""
        );
        await sendEmail({
          to: req.body.email,
          subject: "MA QVT : Création de compte",
          text: text,
        });

        res.json({ data: user, message: "Données envoyées" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const updateUserProfileRoute = async (req, res) => {
  try {
    if (updateUserValidator.validate(req.body).error) {
      console.log(updateUserValidator.validate(req.body).error);
      throw new Error("Données insuffisantes");
    } else {
      let user = await getUserByMail(req.body.email);
      if (user) {
        await updateUserProfile(req.body);
        res.status(200).json({
          data: req.body.email,
          message: "Profil mis à jour avec succès",
        });
      } else {
        res
          .status(400)
          .json({ data: false, message: "Utilisateur inexistant" });
      }
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

/* Place concerning operations on a User */

export const getByEmailUserRoute = async (req, res) => {
  const {
    query: { email },
  } = req;
  try {
    if (email != verifyJwt(req.headers.token).email) {
      throw new Error("Anoter user trying to access anoter user info");
    }
    const user = await getUserByMail(email);
    console.log(user);
    res.json({ data: user, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const getByIdUserRoute = async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const user = await getUserById(id);
    let accessor = verifyJwt(req.headers.token)
    if (user.email != accessor.email && accessor.role == "User") {
      throw new Error("Anoter user trying to access anoter user info");
    }
    console.log(user);
    res.json({ data: user, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const deleteByEmailUserRoute = async (req, res) => {
  const {
    query: { email },
  } = req;
  try {
    if ("Admin" != verifyJwt(req.headers.token).role) {
      throw new Error("Anoter user trying to access anoter user info");
    }
    let user = (user = await getUserByMail(email));
    console.log(user);

    if (user) {
      await deleteUserByEmail(user.email);
      res.status(200).json({ data: email, message: "Données envoyées" });
    } else {
      res.status(400).json({ data: false, message: "Utilisateur inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const deleteByIdUserRoute = async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    if ("Admin" != verifyJwt(req.headers.token).role) {
      throw new Error("Anoter user trying to access anoter user info");
    }

    let user = await getUserById(id);

    if (user) {
      if (user.email == process.env.ADMIN_EMAIL) {
        res.status(405).json({ data: user.email, message: "Suppression non autorisé" });
      } else {
        await deleteUserByEmail(user.email);
        res.status(200).json({ data: user.email, message: "Données envoyées" });
      }
    } else {
      res.status(400).json({ data: false, message: "Utilisateur inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
