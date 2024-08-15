import { AuthRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const editAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.asset) {
      req.user.avatar = req.asset;
      await req.user.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit user avatar");
  }
};
