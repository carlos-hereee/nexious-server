import { PostRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const postReply = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    console.log("req.post :>> ", req.post);
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
