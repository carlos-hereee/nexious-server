import { NextFunction, Response } from "express";
import { AuthRequest } from "@app/request";
import { getUser } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";

export const validateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const username = req.body.username || req.params.username;
    if (!req.user) {
      // assign user
      const user = await getUser({ username });
      if (user) req.user = user;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to validate user");
  }
};
