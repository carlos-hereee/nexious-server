import { UserRequest } from "@app/request";
import { getUser } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getWithUsername = async (req: UserRequest, res: Response) => {
  try {
    const { username } = req.params;
    const user = await getUser({ username });
    // // TODO: ADD ADDITIONAL VERFICATION METHODS
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get user with username");
  }
};
