import { DiagnosticModel } from "../models/diagnostic_model";

const getAllDiagnostics = async () => {
  const diagnostics = await DiagnosticModel.find({});
  return diagnostics;
};

const getAllowedDiagnostics = async () => {
  const diagnostics = await DiagnosticModel.find({ accept_transmission: true });
  return diagnostics;
};


const getDiagnosticById = async (id) => {
  const diagnostic = await DiagnosticModel.findOne({ _id: id });
  return diagnostic;
};

const getDiagnosticByMail = async (email) => {
  const diagnostics = await DiagnosticModel.find({ email: email });
  return diagnostics;
};

const getDiagnosticByUserId = async (id) => {
  const diagnostics = await DiagnosticModel.find({ id_user: id });
  return diagnostics;
};

const deleteDiagnosticById = async (id) => {
  const diagnostic = await DiagnosticModel.findOne({ _id: id });
  if (diagnostic) {
    await diagnostic.remove();
  }
  return diagnostic;
};

const updateDiagnostic = async (data) => {
  const diagnostic = await DiagnosticModel.findOne({ _id: data._id });
  if (diagnostic) {
    await DiagnosticModel.updateOne(
      { _id: data._id },
      { $set: data, $inc: { age: 1 } }
    );
  }
  return diagnostic;
};

const addDiagnostic = async (data) => {
  const diagnostic = new DiagnosticModel({ ...data });
  return await diagnostic.save();
};

export {
  getAllDiagnostics,
  getAllowedDiagnostics,
  getDiagnosticById,
  getDiagnosticByUserId,
  getDiagnosticByMail,
  deleteDiagnosticById,
  updateDiagnostic,
  addDiagnostic,
};
