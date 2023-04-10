import { ObjectId } from "../../deps.ts";
import CommonCollection from "./commonCollection.type.ts";

export interface Hours {
  monday: Date;
  tuesday: Date;
  wednesday: Date;
  thursday: Date;
  friday: Date;
  saturday: Date;
  sunday: Date;
}

export default interface StoreType extends CommonCollection {
  owners: ObjectId[]; // persons ids
  employees: ObjectId[]; // persons ids
  name: string;
  products: ObjectId[]; // products ids
  opensAt: Hours;
  closesAt: Hours;
  closedUntil?: Date; // if present, indicates until when it'll be closed
}
