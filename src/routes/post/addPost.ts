import { PostRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const addPost = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    console.log("req.params :>> ", req.params);
    console.log("req.body :>> ", req.body);
    return;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create post");
  }
};
