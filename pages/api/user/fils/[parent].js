import { deleteByEmailUserRoute, getByEmailUserRoute,getUserFilsRoute } from "../../../../routers/users_routers";
import { isAuth } from "../../../../utils/auth";

const handler = async (req, res) => {
    // console.log("lune rouge")
  if (!isAuth(req.headers.token)) {
    // console.log(req.headers);
    res.status(405).send({ message: "Method not Allowed" });
  } else {
    switch (req.method) {
      case "GET":
        await getUserFilsRoute(req, res);
        break;
      //case "DELETE":
        //await deleteByEmailUserRoute(req, res);
        //break;
      default:
        res.status(405).send({ message: "Methode non authorisé" });
        break;
    }
  }
};

export default handler;
