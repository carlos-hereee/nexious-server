import { StripeUpdateAccountEvent } from "@app/stripe";
import { updateStore } from "@db/models/store/updateStore";

export const accountUpdated = async (event: StripeUpdateAccountEvent) => {
  const account = event.data.object;
  // check if user has completed onboarding`
  if (event.account && account.charges_enabled) {
    await updateStore(event.account, { onBoardingRequired: false });
  }
  // if user was not fully onboarded check details_submitted parameter on their account

  console.log("account :>> ", account);
  // Then define and call a method to handle the successful attachment of a PaymentMethod.
  // handlePaymentMethodAttached(paymentMethod);
};
