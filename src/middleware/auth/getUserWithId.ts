import { getUser } from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { Request, Response } from "express";

export const getUserWithId = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const user = await getUser({ userId: req.user.userId });
      res.status(200).json(user).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error getting user with user ID");
  }
};
