import { stripeEndpointSecret, isDev } from "@appUtils/config.js";
import stripe from "../connection.js";

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
