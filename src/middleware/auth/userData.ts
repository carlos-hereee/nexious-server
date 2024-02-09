import { getUser } from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { Request, Response } from "express";
export const userData = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userId = req.user.userId;
      const user = await getUser({ userId });
      res.status(200).json({ user }).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to send user data");
  }
};
