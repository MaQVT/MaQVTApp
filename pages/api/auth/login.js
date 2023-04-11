import { getUserByMail } from "../../../db/handlers/users_handlers";
import { verifyPassword } from "../../../utils/hash";
import { signJwt } from "../../../utils/jwt";
import { serialize } from 'cookie';


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await getUserByMail(email);

    if(!user){
      res.status(400).json({ message: "Utilisateur non présent dans la base de donnée" });
      return;
    }

    if (user.password == undefined) user.password = "";
    if (verifyPassword(password, user.password) == false) {
      res.status(401).json({ message: "Adresse Mail ou Mot de Passe Incorrect" });
    } else {
      // If authentication is successful, set a cookie with the JWT token
      // Generate a JWT token
      const token = signJwt(
        { email: user.email, role: user.role, username: user.username },
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
        3600*12
      ); // Expires in 1 hour

      // res.setHeader("Set-Cookie", `token=${token}; HttpOnly`);

      const cookieSerialized = serialize('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 3600 * 12 * 1000)
      });
      res.setHeader('Set-Cookie', cookieSerialized);

      // Send a JSON response indicating success
      res.status(200).json({ message: "Connexion reussie", token: `${token}` });
    }
  } else {
    res.status(405).json({ message: "Methode non authorisé" });
  }
}
