import { getApp } from "@dbModels/app/getApp";
import { getUser } from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { Response } from "express";
import { UserRequest } from "@app/request";

export const getAccessData = async (req: UserRequest, res: Response) => {
  try {
    if (req.user) {
      const appList = await getApp({ all: true });
      const user = await getUser({ userId: req.user.userId });
      // console.log("data :>> ", data);
      res.status(200).json({ appList, user }).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
