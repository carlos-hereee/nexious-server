import { stripeSecretKey }  from "@config";

import Stripe  from "stripe";
const stripe = Stripe(stripeSecretKey);

export  stripe;
