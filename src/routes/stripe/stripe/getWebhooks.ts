import type { StoreRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { fetchWebhookList } from "@utils/stripe/webhook/webhooks";
import { Response } from "express";

export const getWebhooks = async (_req: StoreRequest, res: Response) => {
  try {
    const webhook = await fetchWebhookList({ list: 30 });
    return res.status(200).json(webhook.data).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
