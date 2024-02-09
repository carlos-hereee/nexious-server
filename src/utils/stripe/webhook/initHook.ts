import { stripeErrorHandling } from "@stripe/errors";
import { isDev, stripeEndpointSecret as secret } from "@appUtils/config";
import stripe from "../connection";
import { NextFunction, Request, Response } from "express";

export const initHook = (req: Request, res: Response, next: NextFunction) => {
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
