import Admin from "../../models/admin.model.ts";

export const getAdmins = Admin.find.bind(Admin);
export const getAdmin = Admin.findOne.bind(Admin);
export const countAdmins = Admin.count.bind(Admin);
export const createAdmin = Admin.create.bind(Admin);
export const changeAdmin = Admin.updateOne.bind(Admin);
export const changeAdmins = Admin.updateMany.bind(Admin);
export const deleteOneAdmin = Admin.deleteOne.bind(Admin);
export const findAndDeleteAdmin = Admin.findOneAndDelete.bind(Admin);
