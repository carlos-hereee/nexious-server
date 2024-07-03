import Subscription from "@db/schema/subscription";

interface GetSubs {
  subscriptionId: string;
}
export const getSubscription = async ({ subscriptionId }: GetSubs) => {
  return await Subscription.findOne({ subscriptionId });
};
