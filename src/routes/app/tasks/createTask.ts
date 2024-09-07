import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const createTask = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    console.log("req.body :>> ", req.body);
    console.log("req.params :>> ", req.params);
    return;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
