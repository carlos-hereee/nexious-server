import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import type { AuthRequest } from "@app/request";

export const minUserData = async (req: AuthRequest, res: Response) => {
  try {
    // depopulate auth data and populate data required by client
    const userData = `ownedApps subscriptions permissions ownedApps.userId${
      req.user.notifications ? " notifications" : ""
    }${req.user.subscriptions ? " subscriptions" : ""}`;

    const user = await req.user.depopulate("auth").populate(userData);
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
