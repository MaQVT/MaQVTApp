import { UserModel } from "../models/users_model";

const getAllUsers = async () => {
  const users = await UserModel.find({});
  return users;
};

const getAllManagers = async () => {
  const users = await UserModel.find({ role: "Manager" });
  return users;
};

const getAllUsersByRole = async (role) => {
  const users = await UserModel.find({ role: role });
  return users;
};
const getUsersByParents = async (parentId) =>{
  let parent = await UserModel.findOne({_id:parentId})
  let fils = {}
  if(parent.role=="Admin"){
    fils  = await UserModel.find({$or:[{ role: "Admin" },{ parentId: parentId }]});
  }else{
    fils = await UserModel.find({ parentId: parentId });
  }
  return fils
}
const getAllClients = async () => {
  const users = await UserModel.find({ role: "Client" });
  return users;
};

const getAllConsultants = async () => {
  const users = await UserModel.find({ role: "Consultant" });
  return users;
};

const getAllAdmins = async () => {
  const users = await UserModel.find({ role: "Admin" });
  return users;
};

const getUserByMail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  return user;
};

const getUserById = async (id) => {
  const user = await UserModel.findOne({ _id: id });
  return user;
};

const deleteUserById = async (id) => {
  const user = await UserModel.findOne({ _id: id });
  if (user) {
    await user.remove();
  }
  return user;
};

const getUserByStatus = async(status)=>{
  const user = await UserModel.find({ status: status });
  if (user) {
    await user.remove();
  }
  return user;
}

const deleteUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  console.log(user)
  if (user) {
    await user.remove();
  }
  return user;
};

const UpdateByIdUser = async(id,data)=>{
  console.log(data);
  
  const user = await UserModel.findOneAndUpdate({"_id":id},{
    ...data
  })
  return user;
}

const updateUserProfile = async (data) => {
  const user = await UserModel.findOne({ email: data.email });
  if (user) {
    await UserModel.updateOne(
      { email: data.email },
      { $set: data, $inc: { age: 1 } }
    );
  }
  return user;
};

const addUser = async (data) => {
  const user = new UserModel({ ...data });
  return await user.save();
};

export {
  getAllUsers,
  getAllManagers,
  getAllClients,
  getAllConsultants,
  getAllAdmins,
  getUserById,
  getUserByMail,
  deleteUserById,
  deleteUserByEmail,
  updateUserProfile,
  addUser,
  getUsersByParents,
  getAllUsersByRole,
  UpdateByIdUser,
  getUserByStatus
};
