import { StoreRequest } from "@app/request";
import Messages from "@db/schema/messages";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

interface PBody {
  data: string;
  star: number;
}
interface PRating {
  data: string;
  status: {
    star: undefined | number;
  };
}
export const postReview = async (req: StoreRequest<PBody>, res: Response, next: NextFunction) => {
  try {
    const { avatar, userId } = req.user;
    const name = generateUsername(req.user);
    const data: PRating = { data: req.body.data, status: { star: undefined } };
    // create message
    if (req.body.star >= 0) data.status.star = req.body.star;
    const message = await Messages.create({ ...data, user: { avatar, userId, name } });
    if (message) {
      req.message = message;
      req.merch.reviews?.push(message._id);
      await req.merch.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
