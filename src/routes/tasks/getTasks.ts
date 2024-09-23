import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const getTasks = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    console.log("req.params :>> ", req.params);
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
