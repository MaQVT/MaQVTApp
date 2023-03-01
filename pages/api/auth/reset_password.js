import {
  getUserByMail,
  updateUserProfile,
} from "../../../db/handlers/users_handlers";
import { signJwt, verifyJwt } from "../../../utils/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Get the token and new password from the request body
    const { token, password } = req.body;

    // Verify the token and get the user's email
    let email;
    try {
      const decoded = verifyJwt(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      email = decoded.email;
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "Lien de réinitialisation invalide" });
    }

    // Update the user's password in your database
    const user = await getUserByMail(email);

    if (user) {
      updateUserProfile({ email: email, password: password });
      // Generate a new JWT token with the user's email
      const newToken = signJwt(
        { email: user.email, role: user.role, username: user.username },
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
        3600
      ); // Expires in 1 hour

      // Send a JSON response with the new token
      res
        .status(200)
        .json({
          token: newToken,
          message: "Mot de passe reinitialisé avec succès",
        });
    } else {
      res.status(405).json({ message: "Methode non authorisé" });
    }
  } else {
    res.status(405).json({ message: "Methode non authorisé" });
  }
}
