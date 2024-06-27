import { Response } from "express";
import { StoreRequest } from "@app/request";
import { getSessionWithId } from "@utils/stripe/payments/getCheckoutSession";
import { useGenericErrors } from "@utils/auth/useGenericErrors";

export const portalSession = async (req: StoreRequest<{ session_id: string }>, res: Response) => {
  try {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { session_id } = req.body;
    const checkoutSession = await getSessionWithId({ id: session_id });

    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
  } catch (error) {
    useGenericErrors(res, error);
  }
};
