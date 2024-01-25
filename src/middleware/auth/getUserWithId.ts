import { getUser } from "@dbModels/users/getUser.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const getUserWithId: RequestHandler = async (req, res) => {
  try {
    if (req.user) {
      const user = await getUser({ userId: req.user.userId });
      res.status(200).json(user).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error getting user with user ID");
  }
};
