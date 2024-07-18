import type { StoreRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createWebhook } from "@utils/stripe/webhook/webhooks";
import { Response } from "express";

export const addWebhook = async (req: StoreRequest, res: Response) => {
  try {
    await createWebhook({ url: "" });
    // return res.status(200).json(webhook.data).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
