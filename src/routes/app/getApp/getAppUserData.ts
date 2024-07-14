import type { AppRequest } from "@app/request";
import { IUserSchema } from "@app/user";
import { getApp } from "@db/models/app/getApp";
import { getAllUsers } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getAppUserData = async (req: AppRequest, res: Response) => {
  try {
    const { appId } = req.params;
    let users: IUserSchema[] = [];
    if (appId !== "platform") {
      const data = await getApp({ appId });
      if (data) {
        await data.populate("subscribers");
        users = data.subscribers as unknown as IUserSchema[];
      }
    } else {
      const data = await getAllUsers({ all: true });
      if (data) users = data;
    }
    res.status(200).json(users).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
