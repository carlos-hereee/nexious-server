import { getUserAuth } from "@dbModels/users/getUserAuth.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const getWithUsername: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserAuth({ username });
    // // TODO: ADD ADDITIONAL VERFICATION METHODS
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get user with username");
  }
};
