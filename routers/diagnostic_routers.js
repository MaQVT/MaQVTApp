import moment from "moment";
import { addDiagnostic, deleteAllDiagnostics, getAllDiagnostics, getDiagnosticById, getDiagnosticByMail, updateDiagnostic } from "../db/handlers/diagnostic_handlers";
import { verifyJwt } from "../utils/jwt";

export const getAllDiagnosticRoute = async (req, res) => {
  try {
    console.log("I'm in")
    const diagnostics = await getAllDiagnostics();
    console.log(diagnostics)
    res.json({ data: diagnostics, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const addDiagnosticRoute = async (req, res) => {
  try {
    req.body.date = moment(moment.now()).utcOffset('+02:00').format("MM/DD/YYYY HH:mm:ss");
    console.log(req.body);
    let diagnostic = await getDiagnosticById(req.body._id);
    console.log("OUI");
    if (diagnostic) {
      res.status(400).json({
        data: false,
        message: "Diagnostic déjà existant",
      });
    } else {
      diagnostic = await addDiagnostic(req.body);
      res.json({ data: diagnostic, message: "Données envoyées" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const updateDiagnosticRoute = async (req, res) => {
  try {
    let diagnostic = await getDiagnosticById(req.body._id);
    if (diagnostic) {
      diagnostic = await updateDiagnostic(req.body);
      res.status(200).json({
        data: diagnostic,
        message: "Diagnostic mis à jour avec succès",
      });
    } else {
      res.status(400).json({ data: false, message: "Diagnostic inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const deleteDiagnosticRoute = async (req, res) => {
  try {
    if ("Admin" != verifyJwt(req.headers.token).role) {
      throw new Error("Another user trying to delete all info");
    }

    let diagnostics = await deleteAllDiagnostics();
    res.status(200).json({ data: diagnostics, message: "Delete done" });

  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

/* Place concerning operations on a Diagnostic */

export const getByEmailDiagnosticRoute = async (req, res) => {
  const {
    query: { email },
  } = req;
  try {
    if (email != verifyJwt(req.headers.token).email) {
      throw new Error("Anoter user trying to access anoter user info");
    }
    const diagnostics = await getDiagnosticByMail(email);
    console.log(diagnostics);
    res.json({ data: diagnostics, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const getByIdDiagnosticRoute = async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const diagnostic = await getDiagnosticById(id);
    if (diagnostic.email != verifyJwt(req.headers.token).email && verifyJwt(req.headers.token).role != "Admin" && verifyJwt(req.headers.token).role != "Consultant") {
      throw new Error("Anoter user trying to access anoter user info");
    }
    console.log(diagnostic);
    res.json({ data: diagnostic, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
