import { UpdateModel } from "../models/update_model";

const getAllUpdates = async () => {
  const updates = await UpdateModel.find({});
  return updates;
};

const getUpdateByDisponible = async () => {
  const update = await UpdateModel.findOne({ disponible: true });
  return update;
};

export {
  getAllUpdates,
  getUpdateByDisponible,
};
