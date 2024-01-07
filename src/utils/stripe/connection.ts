import { stripeSecretKey } from "@config";

import Stripe from "stripe";
const stripe = new Stripe(stripeSecretKey);

export default stripe;
