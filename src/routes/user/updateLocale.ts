import { UserRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const updateLocale = async (req: UserRequest<{ data: string }>, res: Response) => {
  try {
    req.user.locale = req.body.data;
    await req.user.save();
    return res.status(202).json(req.user).end();
  } catch (error) {
    useGenericErrors(res, error, "update locale");
  }
};
