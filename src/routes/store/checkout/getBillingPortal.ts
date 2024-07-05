import { StoreRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createPortalSession } from "@utils/stripe/accounts/generateLinkSession";
import { Response } from "express";

export const getBillingPortal = async (req: StoreRequest, res: Response) => {
  try {
    const session = await createPortalSession({ customer: req.params.customer });

    res.status(200).json(session.url).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to confirm intent");
  }
};
