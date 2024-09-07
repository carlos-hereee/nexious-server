import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateBoard = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    console.log("req.body :>> ", req.body);
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
