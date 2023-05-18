import moment from "moment";
import { addColDiagnostic, getAllColDiagnostics, getColDiagnosticById, getColDiagnosticByMail, getColDiagnosticByUserId, updateColDiagnostic } from "../db/handlers/col_diagnostic_handlers";
import { verifyJwt } from "../utils/jwt";

export const getAllColDiagnosticRoute = async (req, res) => {
  try {
    const colDiagnostics = await getAllColDiagnostics();
    res.json({ data: colDiagnostics, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const addColDiagnosticRoute = async (req, res) => {
  try {
    req.body.date = moment(moment.now()).format("MM/DD/YYYY HH:mm:ss");
    let colDiagnostic = await getColDiagnosticById(req.body._id);
    if (colDiagnostic) {
      res.status(400).json({
        data: false,
        message: "ColDiagnostic déjà existant",
      });
    } else {
      colDiagnostic = await addColDiagnostic(req.body);
      res.json({ data: colDiagnostic, message: "Données envoyées" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const updateColDiagnosticRoute = async (req, res) => {
  try {
    let colDiagnostic = await getColDiagnosticById(req.body._id);
    if (colDiagnostic) {
      colDiagnostic = await updateColDiagnostic(req.body);
      res.status(200).json({
        data: colDiagnostic,
        message: "ColDiagnostic mis à jour avec succès",
      });
    } else {
      res.status(400).json({ data: false, message: "ColDiagnostic inexistant" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

/* Place concerning operations on a ColDiagnostic */

export const getByEmailColDiagnosticRoute = async (req, res) => {
  const {
    query: { email },
  } = req;
  try {
    const colDiagnostics = await getColDiagnosticByMail(email);
    res.json({ data: colDiagnostics, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const getByUserIDColDiagnosticRoute = async (req, res) => {
  const {
    query: { userid },
  } = req;
  try {
    const colDiagnostics = await getColDiagnosticByUserId(userid);
    res.json({ data: colDiagnostics, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};

export const getByIdColDiagnosticRoute = async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const colDiagnostic = await getColDiagnosticById(id);
    res.json({ data: colDiagnostic, message: "Données envoyées" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
};
