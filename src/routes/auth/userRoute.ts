import type { AuthRequest } from "@app/request";
import { Response } from "express";

export const userRoute = (req: AuthRequest, res: Response) => res.status(200).json(req.user).end();
