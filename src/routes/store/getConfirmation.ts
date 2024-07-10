import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getCheckoutSession } from "@utils/stripe/payments/getCheckoutSession";
import { NextFunction, Request, Response } from "express";

// import { getStripeCustomer }  from "@routes/webhook/customers/getStripeCustomer";
// import { getCheckoutItems }  from "@routes/webhook/payments/getCheckoutItems";

export const getConfirmation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = req.query.session_id;
    // console.log("sessionId :>> ", sessionId);
    const session = await getCheckoutSession({ id: sessionId as string });
    const sessionDetails = {
      status: session.status,
      mode: session.mode,
      subscription: session.subscription,
      paymentStatus: session.payment_status,
      customerDetails: session.customer_details,
      customer: session.customer,
      metadata: session.metadata,
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
    next();
    // console.log('session :>> ', session);
  } catch (error) {
    useGenericErrors(res, error, "unable to confirm intent");
  }
};
