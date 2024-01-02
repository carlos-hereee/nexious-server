import stripe from "../connection";

export = async ({ id, refreshUrl, returnUrl, type }) => {
  if (!type) type = "account_onboarding";
  return await stripe.accountLinks.create({
    account: id,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type,
  });
};
