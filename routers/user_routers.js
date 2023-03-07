import { NextApiRequest, NextApiResponse } from "next";
import { getUserByMail } from "../db/handlers/users_handlers";
import { getUserByEmailValidator } from "../db/validators/users_validators";
import { verifyJwt } from "../utils/jwt";

export const getUserRoute = async (req, res) => {
  req.body.email = verifyJwt(req.headers.token).email;
  console.log(req.body)
  try {
    if (getUserByEmailValidator.validate(req.body).error) {
      console.log(getUserByEmailValidator.validate(req.body).error);
      throw new Error("Données insuffisantes");
    } else {
      const user = await getUserByMail(req.body.email);
      console.log(user);
      res.json({ data: user, message: "Données envoyées" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
