import handleError from "../../utils/handleError.ts";
import { GetCat } from "../../types/api/cats.type.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { getCat as getCatCtrl } from "../../controllers/mongo/cat.ts";

export async function getCat({ query }: GetCat, res: CommonResponse) {
  const cat = await getCatCtrl(query);
  if (!cat) return handleError(res, "Cat not found", 404);

  const { _id, name, owner } = cat;
  res.send({ message: { id: _id, name, owner } });
}
