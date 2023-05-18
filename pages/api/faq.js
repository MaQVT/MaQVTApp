import { isAuth } from "../../utils/auth";
import { addFaqRoute, deleteByIdFaqRoute, getAllFaqRoute, updateFaqRoute } from "../../routers/faq_routers";

const handler = async (req, res) => {
    if (!isAuth(req.headers.token)) {
        console.log(req.headers);
        res.status(405).send({ message: "Method not Allowed" });
    } else {
        switch (req.method) {
            case "GET":
                await getAllFaqRoute(req, res);
                break;
            case "POST":
                await addFaqRoute(req, res);
                break;
            case "PUT":
                await updateFaqRoute(req, res);
                break;
            case "DELETE":
                await deleteByIdFaqRoute(req, res);
                break;
            default:
                res.status(405).send({ message: "Methode non authorisé" });
                break;
        }
    }
};

export default handler;
