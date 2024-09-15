import Stripe from "stripe";

export const productCreated = (event: Stripe.ProductCreatedEvent) => {
  console.log("prodect created object :>> ", event.data.object);
};
