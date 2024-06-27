import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { StoreRequest } from "@app/request";
import { MerchSchema } from "@app/store";
import { accountLinks } from "@utils/stripe/accounts/generateLinkSession";
import { addProductInfo } from "./stripe/addProductInfo";
import { updateMerch } from "@db/models/merch/updateMerch";
import message from "@db/data/error.message.json";

export const editStripeMerch = async (req: StoreRequest<{ merch: MerchSchema }>, res: Response, next: NextFunction) => {
  try {
    const { accountId, isStripeActive, onBoardingRequired } = req.store;
    // if accountId is not registered deny request
    if (!accountId) return res.status(400).json(message.stripeAccountRequired).end();
    // continue onboarding if required or if stripe is not active
    if (!isStripeActive || onBoardingRequired) {
      const accountLink = await accountLinks({ accountId });
      return res.status(200).json({ url: accountLink.url }).end();
    }
    // add merch to stripe if stripe account is active
    if (accountId && isStripeActive) {
      const { merch, error } = await addProductInfo({ merch: req.body.merch, store: req.store });
      // if failed to add product to stripe
      if (error) return res.status(400).json(error).end();
      // update merch db
      else await updateMerch({ merch });
    }

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store merch");
  }
};
