import Cat from "../../models/catModel.ts";

export const getCats = Cat.find.bind(Cat);
export const getCat = Cat.findOne.bind(Cat);
export const createCat = Cat.create.bind(Cat);
export const changeCat = Cat.updateOne.bind(Cat);
export const changeCats = Cat.updateMany.bind(Cat);
export const deleteOneCat = Cat.deleteOne.bind(Cat);
export const countCats = Cat.countDocuments.bind(Cat);
export const findAndDeleteCat = Cat.findOneAndDelete.bind(Cat);
