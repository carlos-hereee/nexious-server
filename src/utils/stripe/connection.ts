import { stripeSecretKey } from "@appUtils/config.js";

import Stripe from "stripe";
const stripe = new Stripe(stripeSecretKey);

export default stripe;
