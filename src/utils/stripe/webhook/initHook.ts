import { stripeErrorHandling } from "@stripe/errors";
import type { RequestHandler } from "express";
import { isDev, stripeEndpointSecret as secret } from "@appUtils/config";
import stripe from "../connection";

export const initHook: RequestHandler = (req, res, next) => {
  try {
    // key variables
    let signature = req.headers["stripe-signature"];
    const payload = JSON.stringify(req.body, null, 2);
    // use testing data in development
    if (isDev) {
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
