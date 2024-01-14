import { stripeErrorHandling } from "@stripe/errors";
import { constructEvent } from "./constructEvent";
import type { RequestHandler } from "express";

export const initHook: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    req.stripeEvent = constructEvent({ sig, payload });
    next();
  } catch (err) {
    stripeErrorHandling(res, err, "webhook error: ");
  }
};
