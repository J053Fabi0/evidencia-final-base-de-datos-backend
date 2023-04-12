import Cat from "../../models/catModel.ts";

type FindOneParams = Parameters<typeof Cat.findOne>;
type FindParams = Parameters<typeof Cat.find>;
type CountDocumentsParams = Parameters<typeof Cat.countDocuments>;
type CreateParams = Parameters<typeof Cat.create>;
type UpdateOneParams = Parameters<typeof Cat.updateOne>;
type UpdateManyParams = Parameters<typeof Cat.updateMany>;
type DeleteOneParams = Parameters<typeof Cat.deleteOne>;
type FindOneAndDeleteParams = Parameters<typeof Cat.findOneAndDelete>;

export const getCat = (...conditions: FindOneParams) => Cat.findOne(...conditions);
export const getCats = (...conditions: FindParams) => Cat.find(...conditions);
export const countCats = (...conditions: CountDocumentsParams) => Cat.countDocuments(...conditions);
export const createCat = (...conditions: CreateParams) => Cat.create(...conditions);
export const changeCat = (...conditions: UpdateOneParams) => Cat.updateOne(...conditions);
export const changeCats = (...conditions: UpdateManyParams) => Cat.updateMany(...conditions);
export const deleteOneCat = (...conditions: DeleteOneParams) => Cat.deleteOne(...conditions);
export const findAndDeleteCat = (...conditions: FindOneAndDeleteParams) => Cat.findOneAndDelete(...conditions);
