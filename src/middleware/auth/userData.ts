import { getUser } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { UserAuthRequest } from "@app/request";

export const userData = async (req: UserAuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await getUser({ userId });
    res.status(200).json({ user }).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to send user data");
  }
};
