import { ObjectId } from "../../deps.ts";
import CommonCollection from "./commonCollection.type.ts";

export interface ProductSaleDetails {
  amount: number;
  product: ObjectId; // product id
  note?: string; // any notes the client wants to leave
}

export default interface SaleType extends CommonCollection {
  store: ObjectId; // store id
  person: ObjectId; // person id
  details: ProductSaleDetails[];
  paymentMethod: "cash"; // only cash for now
  paid: boolean; // if it has been paid already
  status: "processing" | "ready" | "delivered" | "canceled";
  total: number; // better save it here than needing to calculate it every time
  reasonToCancel?: "didn't pickup" | "client canceled" | string;
}
