import { StoreRequest } from "@app/request";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Response } from "express";

export const editStore = async (req: StoreRequest, res: Response, next: NextFunction) => {
  try {
    if (req.store) {
      const { name, title, body } = req.body;
      const hero = req.asset || "";

      req.store.name = name;
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
