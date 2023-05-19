import { deleteByIdUserRoute, getByIdUserRoute } from "../../../../routers/users_routers";
import { isAuth } from "../../../../utils/auth";

const handler = async (req, res) => {
  if (!isAuth(req.headers.token)) {
    console.log(req.headers);
    res.status(405).send({ message: "Method not Allowed" });
  } else {
    switch (req.method) {
      case "GET":
        await getByIdUserRoute(req, res);
        break;
      case "DELETE":
        await deleteByIdUserRoute(req, res);
        break;
      default:
        res.status(405).send({ message: "Methode non authorisé" });
        break;
    }
  }
};

export default handler;
