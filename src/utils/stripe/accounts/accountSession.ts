import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.accountSessions.create({
    account: id,
    components: {
      account_onboarding: { enabled: false },
    },
  });
};
