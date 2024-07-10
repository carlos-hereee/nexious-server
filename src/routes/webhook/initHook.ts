import { isDev, stripeEndpointSecret as secret } from "@utils/app/config";
import stripe from "../../utils/stripe/connection";
import { NextFunction, Response } from "express";
import { StripeWebhookRequest } from "@app/request";
import { stripeErrorHandling } from "@utils/stripe/errors";

export const initHook = (req: StripeWebhookRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    let signature = req.headers["stripe-signature"];
    const payload = JSON.stringify(req.body, null, 2);
    // use testing data in development
    if (isDev) signature = stripe.webhooks.generateTestHeaderString({ payload, secret });
    // create stripe event with signature
    if (signature) req.stripeEvent = stripe.webhooks.constructEvent(payload, signature, secret);
    next();
  } catch (err) {
    stripeErrorHandling(res, err, "webhook error: ");
  }
};
