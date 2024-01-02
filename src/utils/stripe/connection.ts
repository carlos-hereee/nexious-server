import { stripeSecretKey }  from "../../../config.env";

import Stripe  from "stripe";
const stripe = Stripe(stripeSecretKey);

module.exports = stripe;
