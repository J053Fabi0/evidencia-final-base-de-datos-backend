import Career from "../../models/career.model.ts";

export const getCareers = Career.find.bind(Career);
export const getCareer = Career.findOne.bind(Career);
export const countCareers = Career.count.bind(Career);
export const createCareer = Career.create.bind(Career);
export const changeCareer = Career.updateOne.bind(Career);
export const changeCareers = Career.updateMany.bind(Career);
export const deleteOneCareer = Career.deleteOne.bind(Career);
export const findAndDeleteCareer = Career.findOneAndDelete.bind(Career);
