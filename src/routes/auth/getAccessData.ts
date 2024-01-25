import { getApp } from "@dbModels/app/getApp.js";
import { getUser } from "@dbModels/users/getUser.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const getAccessData: RequestHandler = async (req, res) => {
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
