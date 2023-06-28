import { ColDiagnosticModel } from "../models/col_diagnostic_model";

const getAllColDiagnostics = async () => {
  const colDiagnostics = await ColDiagnosticModel.find({});
  return colDiagnostics;
};

const getColDiagnosticById = async (id) => {
  const colDiagnostic = await ColDiagnosticModel.findOne({ _id: id });
  return colDiagnostic;
};

const getColDiagnosticByMail = async (email) => {
  const colDiagnostics = await ColDiagnosticModel.find({ email: email });
  return colDiagnostics;
};

const getColDiagnosticByUserId = async (id) => {
  const colDiagnostics = await ColDiagnosticModel.find({ id_user: id });
  return colDiagnostics;
};

const deleteColDiagnosticById = async (id) => {
  const colDiagnostic = await ColDiagnosticModel.findOne({ _id: id });
  if (colDiagnostic) {
    await colDiagnostic.remove();
  }
  return colDiagnostic;
};

const deleteAllColDiagnostics = async () => {
  const colDiagnostics = await ColDiagnosticModel.find();
  
  for (const colDiagnostic of colDiagnostics) {
    await colDiagnostic.remove();
  }
  
  return colDiagnostics;
};


const updateColDiagnostic = async (data) => {
  const colDiagnostic = await ColDiagnosticModel.findOne({ _id: data._id });
  if (colDiagnostic) {
    await ColDiagnosticModel.updateOne(
      { _id: data._id },
      { $set: data, $inc: { age: 1 } }
    );
  }
  return colDiagnostic;
};

const addColDiagnostic = async (data) => {
  const colDiagnostic = new ColDiagnosticModel({ ...data });
  return await colDiagnostic.save();
};

export {
  getAllColDiagnostics,
  getColDiagnosticById,
  getColDiagnosticByUserId,
  getColDiagnosticByMail,
  deleteColDiagnosticById,
  deleteAllColDiagnostics,
  updateColDiagnostic,
  addColDiagnostic,
};
