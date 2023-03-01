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
import { addUserValidator, deleteUserByEmailValidator, deleteUserByIdValidator, updateUserValidator } from "../db/validators/users_validators";

export const getAllUsersRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    
    const users = await getAllUsers();
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
  try {
    if(req.body.email && deleteUserByEmailValidator.validate(req.body).error){
        console.log(deleteUserByEmailValidator.validate(req.body).error)
        throw new Error('Données insuffisantes');
    }else if(req.body.id && deleteUserByIdValidator.validate(req.body).error){
        console.log(deleteUserByEmailValidator.validate(req.body).error)
        throw new Error('Données insuffisantes');
    }
    else{
      let user
      if(req.body.email){
        user = await getUserByMail(req.body.email)
      }else{
        user = await getUserById(req.body.id)
      }
      if(user){
        await deleteUserByEmail(req.body.email);
        res.status(200).json({ data: req.body.email, message: "Données envoyées" });
      }else{
        res.status(400).json({ data: false, message: "Utilisateur inexistant" });
      }
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
    req.body.date = moment(moment.now()).format('MM/DD/YYYY HH:mm:ss')
    if(addUserValidator.validate(req.body).error){
      throw new Error('Données insuffisantes');
    }else{
      let user = await getUserByMail(req.body.email)
      if(user){
        res.status(400).json({ data: false, message: "Utilisateur avec cet adresse mail déjà existant"  });
      }else{
        user = await addUser(req.body);
        res.json({ data: user, message: "Données envoyées" });
      }
    }
    
  } catch (error) {
    console.log(error)
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
    if(updateUserValidator.validate(req.body).error){
      console.log(updateUserValidator.validate(req.body).error)
      throw new Error('Données insuffisantes');
    }else{
      let user = await getUserByMail(req.body.email)
      if(user){
        await updateUserProfile(req.body);
        res.status(200).json({ data: req.body.email, message: "Profil mis à jour avec succès" });
      }else{
        res.status(400).json({ data: false, message: "Utilisateur inexistant" });
      }
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};