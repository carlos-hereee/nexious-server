import { getUser } from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { Response } from "express";
import { UserRequest } from "@app/request";

export const getUserWithId = async (req: UserRequest, res: Response) => {
  try {
    if (req.user) {
      const user = await getUser({ userId: req.user.userId });
      res.status(200).json(user).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error getting user with user ID");
  }
};
