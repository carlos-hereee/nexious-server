import { isDev } from "@utils/app/config";
import type { Response } from "express";
import stripe from "stripe";

export const stripeErrorHandling = (res: Response, error: unknown, message?: string) => {
  const err = error as stripe.errors.StripeError;
  // switch (err.type) {
  //   case "StripeCardError":
  //     // A declined card error
  //     err.message; // => e.g. "Your card's expiration year is invalid."
  //     break;
  //   case "StripeRateLimitError":
  //     // Too many requests made to the API too quickly
  //     break;
  //   case "StripeInvalidRequestError":
  //     // Invalid parameters were supplied to Stripe's API
  //     break;
  //   case "StripeAPIError":
  //     // An error occurred internally with Stripe's API
  //     break;
  //   case "StripeConnectionError":
  //     // Some kind of error occurred during the HTTPS communication
  //     break;
  //   case "StripeAuthenticationError":
  //     // You probably used an incorrect API key
  //     break;
  //   default:
  //     // Handle any other types of unexpected errors
  //     break
  if (isDev) console.log("err :>> ", err, message);
  return res.status(400).send(`${message} : ${err.message}`);
};
