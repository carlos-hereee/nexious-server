import { StoreRequest } from "@app/request";
import { StoreBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const editStore = async (req: StoreRequest<StoreBody>, res: Response, next: NextFunction) => {
  try {
    if (req.store) {
      const { storeName, title, body } = req.body;
      const hero = req.asset || "";

      req.store.storeName = storeName;
      req.store.title = title;
      req.store.body = body;
      req.store.hero = hero;
      await req.store.save();
    }

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store");
  }
};
