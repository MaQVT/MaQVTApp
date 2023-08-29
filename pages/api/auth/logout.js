export default async function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    // console.log("REUSSIIIII")
      // Send a JSON response indicating success
      res.status(200).json({ message: "Deconnexion reussie" });
  } else {
    res.status(405).json({ message: "Methode non authorisé" });
  }
}
