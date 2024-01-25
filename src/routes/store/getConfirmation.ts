import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { getSessionWithId } from "@stripe/payments/getSessionWithId.js";
import type { RequestHandler } from "express";
// import { getStripeCustomer } from "@stripe/customers/getStripeCustomer";
// import { getCheckoutItems } from "@stripe/payments/getCheckoutItems";

export const getConfirmation: RequestHandler = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    if (sessionId) {
      // console.log("sessionId :>> ", sessionId);
      const session = await getSessionWithId({ id: sessionId as string });
      // const items = await getCheckoutItems({ id: sessionId });
      // console.log("session :>> ", session);
      const sessionDetails = {
        status: session.status,
        paymentStatus: session.payment_status,

        // customerDetails: session.customer_details,
        // customer: session.customer,
      };
      // console.log("items :>> ", items);
      // // console.log("sessionDetails :>> ", sessionDetails);
      // if (sessionDetails.customer) {
      //   const customer = await getStripeCustomer({ customer: sessionDetails.customer });
      //   sessionDetails.customer = customer;
      //   // console.log("intent :>> ", customer);
      //   // if(sessionDetails.intent){
      //   //   const intent = await
      //   // }
      // }
      res.status(200).json(sessionDetails).end();
    }
    next();
    // console.log('session :>> ', session);
  } catch (error) {
    useGenericErrors(res, error, "unable to confirm intent");
  }
};
