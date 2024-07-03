import { SubscriptionSchema } from "@app/app";
import Subscription from "@db/schema/subscription";

interface UpdateSubs {
  subscriptionId: string;
  subscription: SubscriptionSchema;
}
export const updateSubscriptions = async ({ subscription, subscriptionId }: UpdateSubs) => {
  return await Subscription.updateOne({ subscriptionId }, { $set: subscription });
};
