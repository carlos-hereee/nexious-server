import { getPlatformSubs } from "@db/models/subscription/getSubscription";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Request, Response } from "express";

export const getPlatformPricing = async (_req: Request, res: Response) => {
  try {
    const subs = await getPlatformSubs();
    return res.status(200).json(subs).end();
  } catch (error) {
    return useGenericErrors(res, error, "error occured gettign all apps");
  }
};
