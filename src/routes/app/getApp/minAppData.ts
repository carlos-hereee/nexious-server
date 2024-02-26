import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AppRequest } from "@app/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // depopulate auth data and populate data required by client
    const clientData = "ownedApps subscriptions permissions subscriptions";
    const user = await req.user.depopulate("auth").populate(clientData);
    res.status(200).json({ user, app: req.project }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
