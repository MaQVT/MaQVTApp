import { isAuth } from "../../utils/auth";
import { addDiagnosticRoute, deleteDiagnosticRoute, getAllDiagnosticRoute, updateDiagnosticRoute } from "../../routers/diagnostic_routers";

const handler = async (req, res) => {
  if (!isAuth(req.headers.token)) {
    // console.log(req.headers);
    res.status(405).send({ message: "Method not Allowed" });
  } else {
    switch (req.method) {
      case "GET":
        await getAllDiagnosticRoute(req, res);
        break;
      case "POST":
        await addDiagnosticRoute(req, res);
        break;
      case "PUT":
        await updateDiagnosticRoute(req, res);
        break;
      case "DELETE":
        await deleteDiagnosticRoute(req, res);
        break;
      default:
        res.status(405).send({ message: "Methode non authorisé" });
        break;
    }
  }
};

export default handler;
