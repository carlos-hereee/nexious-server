// import { StoreUpdateWithStripe } from "@app/store";
import { StoreUpdateWithStripe } from "@app/store";
import { StripeUpdateAccountEvent } from "@app/stripe";
import { updateStore } from "@db/models/store/updateStore";

export const accountUpdated = async (event: StripeUpdateAccountEvent) => {
  const account = event.data.object;
  const data: StoreUpdateWithStripe = {};
  // check if user has completed onboarding`
  if (event.account) {
    // charges have been enabled means user passed onboarding
    if (account.charges_enabled) data.onBoardingRequired = false;
    // list reasons disabled
    data.stripeDisabledReason = account.requirements?.disabled_reason || "";
    // data.stripeCurrentlyDue = account.requirements?.currently_due || [];
    // data.stripePassedDue = account.requirements?.past_due || [];
    // data.stripeDeadline = account.requirements?.current_deadline || 0;
    // data.stripePendingVerification = account.requirements?.pending_verification || [];
    await updateStore(event.account, data);
  }
  // if user was not fully onboarded check details_submitted parameter on their account

  // Then define and call a method to handle the successful attachment of a PaymentMethod.
  // handlePaymentMethodAttached(paymentMethod);
};
