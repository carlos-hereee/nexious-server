import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AuthRequest } from "@app/request";
import { getSession } from "@db/models/users/getSession";

export const requireAuthSession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const session = await getSession(req.user.auth);
    if (session) req.auth = session;
    next();
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
