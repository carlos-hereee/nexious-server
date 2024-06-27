import { Response } from "express";
import type { StoreRequest } from "@app/request";
import { getCheckoutSession } from "@utils/stripe/payments/getCheckoutSession";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createPortalSession } from "@utils/stripe/accounts/generateLinkSession";

export const portalSession = async (req: StoreRequest<{ session_id: string }>, res: Response) => {
  try {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { session_id } = req.body;
    const session = await getCheckoutSession({ id: session_id });
    console.log("session :>> ", session);
    if (session.customer) {
      const portalSession = await createPortalSession({ customer: session.customer as string });
      console.log("portalSession :>> ", portalSession);
    }
  } catch (error) {
    useGenericErrors(res, error);
  }
};
