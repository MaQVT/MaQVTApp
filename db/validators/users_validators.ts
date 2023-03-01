const Joi = require("joi");

const addUserValidator = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().required(),
  date: Joi.string().required(),
  password: Joi.string(),
  role: Joi.string(),
  profile_image: Joi.string(),
  send_mail: Joi.boolean(),
  expired_date: Joi.string(),
});

const updateUserValidator = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string(),
  profile_image: Joi.string(),
  send_mail: Joi.boolean(),
  expired_date: Joi.string(),
});

const getUserByIdValidator = Joi.object({
  _id: Joi.string().required(),
});

const getUserByEmailValidator = Joi.object({
  email: Joi.string().email().required(),
});

const deleteUserByIdValidator = Joi.object({
  _id: Joi.string().required(),
});

const deleteUserByEmailValidator = Joi.object({
  email: Joi.string().required(),
});

const getAllManagersOfClientValidator = Joi.object({
  client_id: Joi.string().required(),
});

export {
  addUserValidator,
  updateUserValidator,
  getUserByIdValidator,
  getUserByEmailValidator,
  deleteUserByIdValidator,
  deleteUserByEmailValidator,
  getAllManagersOfClientValidator,
};
