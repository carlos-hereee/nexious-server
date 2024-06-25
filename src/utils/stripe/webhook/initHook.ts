import { stripeErrorHandling } from "@utils/stripe/errors";
import { isDev, stripeEndpointSecret as secret } from "@utils/app/config";
import stripe from "../connection";
import { NextFunction, Response } from "express";
import { StripeWebhookRequest } from "types/request";

export const initHook = (req: StripeWebhookRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    let signature = req.headers["stripe-signature"];
    const payload = JSON.stringify(req.body, null, 2);
    // use testing data in development
    if (isDev) {
      // console.log("secret :>> ", secret);
      signature = stripe.webhooks.generateTestHeaderString({ payload, secret });
    }
    if (signature) {
      // create stripe event with signature
      req.stripeEvent = stripe.webhooks.constructEvent(payload, signature, secret);
    }
    next();
  } catch (err) {
    stripeErrorHandling(res, err, "webhook error: ");
  }
};
