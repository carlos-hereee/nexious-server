import { PostRequest } from "@app/request";
import { getMessage } from "@db/models/posts/getPosts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const requireMessage = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    const message = await getMessage({ messageId: req.params.messageId });
    if (!message) return res.status(404).json("unable to find message").end();
    req.message = message;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
