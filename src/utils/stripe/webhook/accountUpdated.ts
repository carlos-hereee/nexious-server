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
    if (account.charges_enabled) {
      data.onBoardingRequired = false;
      data.isStripeActive = true;
    }
    // list reasons disabled
    data.stripeDisabledReason = account.requirements?.disabled_reason || "";
    await updateStore({ accountId: event.account, stripe: data, type: "stripe-account-updated" });
  }
  // if user was not fully onboarded check details_submitted parameter on their account
};
