const useGenericErrors = require("../../utils/auth/useGenericErrors");
const getStripeCustomer = require("../../utils/stripe/customers/getStripeCustomer");
const getSessionWithId = require("../../utils/stripe/payments/getSessionWithId");
const getCheckoutItems = require("../../utils/stripe/payments/getCheckoutItems");

module.exports = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    // console.log("sessionId :>> ", sessionId);
    const session = await getSessionWithId({ id: sessionId });
    const items = await getCheckoutItems({ id: sessionId });
    // console.log("session :>> ", session);
    const sessionDetails = {
      status: session.status,
      paymentStatus: session.payment_status,
      // customerDetails: session.customer_details,
      // customer: session.customer,
    };
    console.log("items :>> ", items);
    // console.log("sessionDetails :>> ", sessionDetails);
    if (sessionDetails.customer) {
      const customer = await getStripeCustomer({ customer: sessionDetails.customer });
      sessionDetails.customer = customer;
      // console.log("intent :>> ", customer);
    }
    // if(sessionDetails.intent){
    //   const intent = await
    // }
    res.status(200).json(sessionDetails).end();
    // console.log('session :>> ', session);
  } catch (error) {
    useGenericErrors(res, error, "unable to confirm intent");
  }
};
