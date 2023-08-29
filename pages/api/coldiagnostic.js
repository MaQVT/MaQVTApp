import { isAuth } from "../../utils/auth";
import { addColDiagnosticRoute, deleteColDiagnosticRoute, getAllColDiagnosticRoute, updateColDiagnosticRoute } from "../../routers/col_diagnostic_routers";

const handler = async (req, res) => {
  if (!isAuth(req.headers.token)) {
    // console.log(req.headers);
    res.status(405).send({ message: "Method not Allowed" });
  } else {
    switch (req.method) {
      case "GET":
        await getAllColDiagnosticRoute(req, res);
        break;
      case "POST":
        await addColDiagnosticRoute(req, res);
        break;
      case "PUT":
        await updateColDiagnosticRoute(req, res);
        break;
      case "DELETE":
        await deleteColDiagnosticRoute(req, res);
        break;
      default:
        res.status(405).send({ message: "Methode non authorisé" });
        break;
    }
  }
};

export default handler;
