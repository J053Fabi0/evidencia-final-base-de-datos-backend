import { ObjectId } from "../../deps.ts";
import CommonCollection from "./commonCollection.type.ts";

export default interface ProductType extends CommonCollection {
  name: string;
  store: ObjectId; // the store id
  price: number;
  images: string[];
  description?: string;
}
