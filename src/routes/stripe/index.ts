/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { storeWare } from "@middleware/store";
import bodyParser from "body-parser";
import { Router } from "express";
import { managePayouts } from "./stripe/managePayouts";
import { minAppData } from "@routes/minAppData";
import { initHook } from "@routes/stripe/webhook/initHook";
import { getWebhooks } from "./stripe/getWebhooks";
import { stripeWebhook } from "./stripe/stripeWebhook";
import { getBillingPortal } from "@routes/store/checkout/getBillingPortal";
import { getStripeAccount } from "./stripe/getStripeAccount";
import { getStripeAccountBalance } from "./stripe/getStripeAccountBalance";
import { getConfirmation } from "./stripe/getConfirmation";
import { createAccount } from "./stripe/createAccount";
import { stripeOnboarding } from "./stripe/stripeOnboarding";

const route = Router();
const bodyParse = bodyParser.raw({ type: "application/json" });
//
route.get("/webhook", getWebhooks);
route.get("/confirm-intent", getConfirmation);
route.get("/stripe-billing-portal/:customer", getBillingPortal);
route.get("/stripe-account/:appId", storeWare, getStripeAccount, minAppData);
route.get("/stripe-account/:appId/balance", storeWare, getStripeAccountBalance, minAppData);
route.post("/stripe-account-link/:appId", storeWare, stripeOnboarding);

// manage stripe payouts
route.post("/build-stripe-store/:appId", storeWare, createAccount, minAppData);
route.post("/stripe-account/:appId/payouts/:option", storeWare, managePayouts, minAppData);
// construct stripe webhook
route.post("/webhook", bodyParse, initHook, stripeWebhook);

export default route;
