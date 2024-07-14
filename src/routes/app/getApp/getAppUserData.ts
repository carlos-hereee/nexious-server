import type { AppRequest } from "@app/request";
import { getApp } from "@db/models/app/getApp";
import { getAllUsers } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getAppUserData = async (req: AppRequest, res: Response) => {
  try {
    const { appId } = req.params;
    if (appId !== "platform") {
      const data = await getApp({ appId });
      return res.status(200).json(data?.subscribers).end();
    }
    if (appId === "platform") {
      const data = await getAllUsers({ all: true });
      return res.status(200).json(data).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
