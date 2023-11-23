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

const deleteAllDiagnostics = async () => {
  const diagnostics = await DiagnosticModel.find();
  
  for (const diagnostic of diagnostics) {
    await diagnostic.remove();
  }
  
  return diagnostics;
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

async function isLastDiagnosticWithin7Days(email) {
  try {
    const lastDiagnostic = await DiagnosticModel
      .findOne({ email })
      .sort({ date: -1 })
      .exec();

    if (!lastDiagnostic) {
      return false; // No document found for the given email
    }

    // Convert the date string to a Date object
    const lastDiagnosticDate = new Date(lastDiagnostic.date);
    const currentDate = new Date();

    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Compare the date of the last diagnostic with the date 7 days ago
    return lastDiagnosticDate >= sevenDaysAgo;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function isDiagnosticExists(email) {
  try {
    const lastDiagnostic = await DiagnosticModel
      .findOne({ email })

    if (!lastDiagnostic) {
      return false; // No document found for the given email
    }
    return true
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getAllDiagnosticsSharedDistinctEmail() {
  try {
    const uniqueEmails = await DiagnosticModel.distinct('email', { status: { $in: ['public', 'consultant'] } });
    return uniqueEmails;
  } catch (error) {
    return [];
  }
}

export {
  getAllDiagnostics,
  getAllowedDiagnostics,
  getDiagnosticById,
  getDiagnosticByUserId,
  getDiagnosticByMail,
  deleteDiagnosticById,
  deleteAllDiagnostics,
  updateDiagnostic,
  addDiagnostic,
  isLastDiagnosticWithin7Days,
  isDiagnosticExists,
  getAllDiagnosticsSharedDistinctEmail
};
