import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import { IMapSchema } from "@app/app";
import Maps from "@db/schema/maps";

export const editMap = async (req: AppRequest<IMapSchema>, res: Response, next: NextFunction) => {
  try {
    await Maps.findOneAndUpdate({ _id: req.body._id }, { $set: req.body });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
