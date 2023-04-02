import { getByIdDiagnosticRoute } from "../../../../routers/diagnostic_routers";
import { isAuth } from "../../../../utils/auth";

const handler = async (req, res) => {
  if (!isAuth(req.headers.token)) {
    console.log(req.headers);
    res.status(405).send({ message: "Method not Allowed" });
  } else {
    switch (req.method) {
      case "GET":
        await getByIdDiagnosticRoute(req, res);
        break;
      default:
        res.status(405).send({ message: "Methode non authorisé" });
        break;
    }
  }
};

export default handler;
