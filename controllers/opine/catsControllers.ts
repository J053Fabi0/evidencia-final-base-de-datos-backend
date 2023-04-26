import {
  createCat,
  changeCat,
  deleteOneCat,
  getCat as getCatCtrl,
  getCats as getCatsCtrl,
} from "../../controllers/mongo/cat.ts";
import { getPerson } from "../mongo/person.ts";
import handleError from "../../utils/handleError.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { GetCat, GetCats, PostCat, UpdateCat, DeleteCat } from "../../types/api/cats.type.ts";

export async function getCat({ query }: GetCat, res: CommonResponse) {
  const cat = await getCatCtrl(query).populate("owner", "name age _id");
  if (!cat) return handleError(res, "Cat not found", 404);

  const { _id, name, owner } = cat;
  res.send({
    message: {
      name,
      owner: {
        name: owner.name,
        age: owner.age,
        id: owner.id,
      },
      id: _id,
    },
  });
}

export const getCats = async (_: GetCats, res: CommonResponse) =>
  res.send({
    message: (await getCatsCtrl({}).populate("owner", "name age _id")).map(({ name, owner, _id }) => ({
      name,
      owner: {
        name: owner.name,
        age: owner.age,
        id: owner.id,
      },
      id: _id,
    })),
  });

export async function postCat({ body }: PostCat, res: CommonResponse) {
  if (body.owner) {
    const foundOwner = await getPerson({ _id: body.owner });
    if (!foundOwner) return handleError(res, "Owner not found", 404);
  }

  const { _id, name, owner } = await createCat(body);
  res.send({ message: { id: _id, name, owner } });
}

export async function updateCat({ body: { _id, ...data } }: UpdateCat, res: CommonResponse) {
  if (data.owner) {
    const foundOwner = await getPerson({ _id: data.owner });
    if (!foundOwner) return handleError(res, "Owner not found", 404);
  }

  const updateCat = await (async () => {
    await changeCat({ _id }, data);
    return await getCatCtrl({ _id });
  })();

  if (!updateCat) return handleError(res, "Cat not found", 404);
  res.send({ message: { id: updateCat._id, name: updateCat.name, owner: updateCat.owner } });
}

export async function deleteCat({ body }: DeleteCat, res: CommonResponse) {
  const cat = await deleteOneCat(body);
  if (cat.deletedCount === 0) return handleError(res, "Cat not found", 404);

  res.send({ message: "Cat deleted" });
}
