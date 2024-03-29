import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Request, Response } from "express";

export const getAppList = async (_req: Request, res: Response) => {
  try {
    const apps = await getApp({ all: true });
    return apps ? res.status(200).json(apps).end() : res.status(200).json([]).end();
  } catch (error) {
    return useGenericErrors(res, error, "error occured gettign all apps");
  }
};
