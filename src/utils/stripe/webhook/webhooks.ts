import { StripeWebhookParams } from "@app/stripe";
import stripe from "../connection";
import { baseUrl } from "@utils/app/config";

export const fetchWebhookList = async ({ list }: StripeWebhookParams) => {
  return await stripe.webhookEndpoints.list({ limit: list });
};
export const fetchWebhook = async ({ id }: StripeWebhookParams) => {
  if (id) return await stripe.webhookEndpoints.retrieve(id);
};
export const createWebhook = async ({ url }: StripeWebhookParams) => {
  // require key variable
  if (!url) throw Error("url param is required");
  return await stripe.webhookEndpoints.create({
    url: `${baseUrl}/webhook/${url}`,
    enabled_events: ["payment_intent.payment_failed", "payment_intent.succeeded"],
  });
};
