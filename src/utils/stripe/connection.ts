import { stripeSecretKey } from "@utils/app/config";

import Stripe from "stripe";
const stripe = new Stripe(stripeSecretKey);

export default stripe;
