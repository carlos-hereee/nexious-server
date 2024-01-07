import { stripeEndpointSecret, isDev } from "@config";
import stripe from "../connection";

export const constructEvent = ({ sig, payload }) => {
  // console.log("enpointSecret :>> ", sig);
  const payloadString = JSON.stringify(payload, null, 2);
  if (isDev) {
    sig = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: stripeEndpointSecret,
    });
  }
  return stripe.webhooks.constructEvent(payloadString, sig, stripeEndpointSecret);
};
