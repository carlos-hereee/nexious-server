import { UserRequest } from "@app/request";
import { Response } from "express";

export const userRoute = (req: UserRequest, res: Response) => {
  res.status(200).json(req.user).end();
};
