import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AuthRequest } from "@app/request";
import { getSession } from "@db/models/users/getSession";

export const aquireAuthSession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.auth) {
      const session = await getSession({ id: req.user.auth });
      if (session) req.auth = session;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
