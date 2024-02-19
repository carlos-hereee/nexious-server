// import { AppBody } from "@app/app";
// import { AppRequest } from "@app/request";
// import { AppRequest, IResponse } from "@app/request";
import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
// import { Response } from "express";
import { Request, Response } from "express";

export const getAppWithName = async (req: Request, res: Response) => {
  // export const getAppWithName = async (req: Request<{ params: { appName: string } }>, res: Response) => {
  try {
    const appName = req.params.appName?.split("+").join(" ");
    const app = await getApp({ appName });
    res.status(200).json({ app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
