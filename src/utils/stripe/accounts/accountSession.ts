const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.accountSessions.create({
    account: id,
    components: {
      account_onboarding: { enabled: false },
    },
  });
};
