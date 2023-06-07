import moment from "moment";
import { addFaq, getAllFaqs, getFaqById, deleteFaqById, updateFaq } from "../db/handlers/faq_handlers";
import { verifyJwt } from "../utils/jwt";

export const getAllFaqRoute = async (req, res) => {
  try {
    const faqs = await getAllFaqs();
    console.log(faqs)
    res.json({ data: faqs, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const addFaqRoute = async (req, res) => {
  try {
    req.body.date = moment(moment.now()).utcOffset('+02:00').format("MM/DD/YYYY HH:mm:ss");
    console.log(req.body);
    let faq = await getFaqById(req.body._id);
    if (faq) {
      res.status(400).json({
        data: false,
        message: "Faq déjà existant",
      });
    } else {
      faq = await addFaq(req.body);
      res.json({ data: faq, message: "Données envoyées" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const updateFaqRoute = async (req, res) => {
  try {
    let faq = await getFaqById(req.body._id);
    if (faq) {
      faq = await updateFaq(req.body);
      res.status(200).json({
        data: faq,
        message: "Faq mis à jour avec succès",
      });
    } else {
      res.status(400).json({ data: false, message: "Faq inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
;
/* Place concerning operations on a Faq */

export const deleteByIdFaqRoute = async (req, res) => {
  const id = req.body._id
  try {
    if ("Admin" != verifyJwt(req.headers.token).role) {
      throw new Error("Anoter user trying to access anoter user info");
    }

    let faq = await getFaqById(id);

    if (faq) {
        await deleteFaqById(faq._id);
        res.status(200).json({ data: faq, message: "Données envoyées" });
    } else {
      res.status(400).json({ data: false, message: "Faq inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const getByIdFaqRoute = async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const faq = await getFaqById(id);
    if (verifyJwt(req.headers.token).role != "Admin") {
      throw new Error("Anoter user trying to access anoter user info");
    }
    console.log(faq);
    res.json({ data: faq, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
