import stripe from "../connection";

export const accountSession = async ({ id }) => {
  return await stripe.accountSessions.create({
    account: id,
    components: {
      account_onboarding: { enabled: false },
    },
  });
};
