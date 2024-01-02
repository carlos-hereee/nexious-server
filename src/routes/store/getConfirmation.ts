import useGenericErrors  from "../../utils/auth/useGenericErrors";
import getStripeCustomer  from "../../utils/stripe/customers/getStripeCustomer";
import getSessionWithId  from "../../utils/stripe/payments/getSessionWithId";
import getCheckoutItems  from "../../utils/stripe/payments/getCheckoutItems";

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
