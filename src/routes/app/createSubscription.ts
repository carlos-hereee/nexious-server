import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import type { AccountTier } from "@app/user";

interface Body {
  subscription: AccountTier;
}
export const createSubscription = async (req: AppRequest<Body>, res: Response, next: NextFunction) => {
  try {
    const { appId } = req.params;
    const { subscription } = req.body;
    // add subcription to platform if platform owner
    if (appId === "platform" && req.user.isPlatformOwner) {
      console.log("appId :>> ", appId);
      console.log("subscription :>> ", subscription);
    }
    // await req.project.save();
    return;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
