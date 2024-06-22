import { StoreRequest } from "@app/request";
import { StoreBody } from "@app/store";
import { generateStringUrl } from "@utils/app/generateUrl";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const editStore = async (req: StoreRequest<StoreBody>, res: Response, next: NextFunction) => {
  try {
    const { storeName, title, body } = req.body;
    const hero = req.asset || "";
    if (storeName) {
      req.store.storeName = storeName;
      req.store.storeLink = generateStringUrl(storeName);
    }
    if (title) req.store.title = title;
    if (body) req.store.body = body;
    if (hero) req.store.hero = hero;

    await req.store.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store");
  }
};
