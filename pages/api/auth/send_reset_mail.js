import { getUserByMail } from "../../../db/handlers/users_handlers";
import { getMailTemplate } from "../../../utils/getMailTemplate";
import { signJwt } from "../../../utils/jwt";
import { sendEmail } from "../../../utils/sendMail";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Get the user's email from the request body
    const { email } = req.body;

    // Check if the user's email exists in your database
    const user = await getUserByMail(email);

    if (user) {
      // Generate a JWT token with the user's email
      const token = signJwt(
        { email },
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
        3600
      ); // Expires in 1 hour

      // Construct the password reset link
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset_password?token=${token}`;

      console.log(resetLink);

      // Send a password reset email to the user's email address
      const text = getMailTemplate(
        "Lien de réinitialisation de votre mot de passe",
        "Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe !",
        resetLink,
        "Réinitialiser mon mot de passe"
      );

      console.log(resetLink);

      sendEmail({
        to: email,
        subject: "Lien de réinitialisation du mot de passe",
        text: text,
      })
        .then(() => {
          // Send a JSON response with a success message
          res.status(200).json({
            message: "Lien de reinitialisation de mot de passe envoyé !",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Envoie de mot de passe échoué" });
        });
    } else {
      res.status(405).json({ message: "Methode non authorisé" });
    }
  } else {
    res.status(405).json({ message: "Methode non authorisé" });
  }
}
