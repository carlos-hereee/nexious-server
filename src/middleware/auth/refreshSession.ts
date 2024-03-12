import { makeSession } from "@utils/auth/makeSession";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AuthRequest } from "@app/request";

export const refreshSession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // access granted: generate new sessionId
    const sessionId = makeSession(req.user.userId);
    req.auth.sessionId = sessionId;
    await req.auth.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
