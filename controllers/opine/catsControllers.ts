import handleError from "../../utils/handleError.ts";
import { GetCat, GetCats, PostCat } from "../../types/api/cats.type.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { getCat as getCatCtrl, getCats as getCatsCtrl, createCat } from "../../controllers/mongo/cat.ts";
import { getPerson } from "../mongo/person.ts";

export async function getCat({ query }: GetCat, res: CommonResponse) {
  const cat = await getCatCtrl(query);
  if (!cat) return handleError(res, "Cat not found", 404);

  const { _id, name, owner } = cat;
  res.send({ message: { id: _id, name, owner } });
}

export const getCats = async (_: GetCats, res: CommonResponse) =>
  res.send({ message: (await getCatsCtrl({})).map(({ name, owner, _id }) => ({ name, owner, id: _id })) });

export async function postCat({ body }: PostCat, res: CommonResponse) {
  if (body.owner) {
    const foundOwner = await getPerson({ _id: body.owner });
    if (!foundOwner) return handleError(res, "Owner not found", 404);
  }

  const { _id, name, owner } = await createCat(body);
  res.send({ message: { id: _id, name, owner } });
}
