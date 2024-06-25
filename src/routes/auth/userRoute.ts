import { AuthRequest } from "types/request";
import { Response } from "express";

export const userRoute = (req: AuthRequest, res: Response) => {
  return res.status(200).json(req.user).end();
};
