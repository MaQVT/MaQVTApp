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
  const sortOrder = ["Admin", "Consultant", "Client", "Manager", "User"];
  let parent = await UserModel.findOne({_id:parentId})
  let fils = {}
  if(parent.email==process.env.ADMIN_EMAIL){
    fils  = await UserModel.find({$or:[{ role: "Admin" }, { role: "Consultant" },{ parentId: parentId }]});
  }else if(parent.role=="Admin"){
    fils  = await UserModel.find({$or:[{ role: "Consultant" },{ parentId: parentId }]});
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
  return user;
}

const getUserByDelete = async(askDelete)=>{
  const user = await UserModel.find({ ask_delete: askDelete });
  return user;
}

const deleteUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  // console.log(user)
  if (user) {
    await user.remove();
  }
  return user;
};

const UpdateByIdUser = async(id,data)=>{
  // /console.log(data);
  
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

async function getParentEmails(childEmails) {
  const parentIds = await UserModel.distinct('parentId', { email: { $in: childEmails } });
  const parentsExist = parentIds.filter((value) => value != "")
  const parents = await UserModel.find({ _id: { $in: parentsExist } });
  const parentEmails = [...new Set(parents.map((parent) => parent.email))];
  return parentEmails;
}

async function getAllEmailsUnderUser(id) {
  const childIds1 = await UserModel.distinct('_id', { parentId: { $in: [id] } });
  const childIds2 = await UserModel.distinct('_id', { parentId: { $in: childIds1 } });
  const childIds3 = await UserModel.distinct('_id', { parentId: { $in: childIds2 } });
  const ids =  [...childIds3, ...childIds2, ...childIds1];
  const childEmails = await UserModel.distinct('email', { _id: { $in: ids} });
  return childEmails;
} 

async function getDirectEmailsUnderUser(id) {
  const ids = await UserModel.distinct('_id', { parentId: { $in: [id] } });
  const childEmails = await UserModel.distinct('email', { _id: { $in: ids} });
  return childEmails;
} 

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
  getUserByStatus,
  getUserByDelete,
  getParentEmails,
  getAllEmailsUnderUser,
  getDirectEmailsUnderUser
};
