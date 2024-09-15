import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getCheckoutSession } from "@utils/stripe/payments/getCheckoutSession";
import { Request, Response } from "express";

export const getConfirmation = async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.session_id;
    // connect account id
    const accountId = req.query.accountId;
    const stripeAccount = accountId ? { stripeAccount: accountId as string } : undefined;
    const session = await getCheckoutSession({ id: sessionId as string, stripeAccount: stripeAccount });
    const sessionDetails = {
      status: session.status,
      mode: session.mode,
      subscription: session.subscription,
      paymentStatus: session.payment_status,
      customerDetails: session.customer_details,
      customer: session.customer,
      metadata: session.metadata,
    };

    res.status(200).json(sessionDetails).end();
    // console.log('session :>> ', session);
  } catch (error) {
    useGenericErrors(res, error, "unable to confirm intent");
  }
};
