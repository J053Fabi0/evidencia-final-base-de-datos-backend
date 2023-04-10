import CommonCollection from "./commonCollection.type.ts";

export default interface PersonType extends CommonCollection {
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  lastVerificationEmail: Date;
}
