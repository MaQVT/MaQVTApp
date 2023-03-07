import { NextApiRequest, NextApiResponse } from "next";
import {
  addUser,
  getAllUsers,
  getAllManagers,
  getUserByMail,
  deleteUserByEmail,
  getUserById,
  updateUserProfile,
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

export const getAllUsersRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

export const getAllManagersRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

export const deleteUserRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("BODY : " + req.body._id)
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
    console.log(user)
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

export const addUserRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    req.body.date = moment(moment.now()).format("MM/DD/YYYY HH:mm:ss");
    if(!req.body.password) req.body.password = "2023"
    if (addUserValidator.validate(req.body).error) {
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
          "Compte créé chez Wunju QVT",
          `Voici vos informations de compte pour votre premère connexion ! <br />Email : ${req.body.email}<br />Mot de passe : 2023<br />N'hesitez pas à modifier votre mot de passe ! <br />Cliquez sur le bouton ci-dessous pour vous connecter !`,
          process.env.NEXT_PUBLIC_APP_URL,
          "Acceder à Wunju QVT"
        );
        await sendEmail({
          to: req.body.email,
          subject: "Compte créé chez Wunju QVT",
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

export const updateUserProfileRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
