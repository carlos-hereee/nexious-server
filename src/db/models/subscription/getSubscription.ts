import Subscription from "@db/schema/subscription";

interface GetSubs {
  subscriptionId?: string;
  productId?: string;
}
export const getSubscription = async ({ subscriptionId, productId }: GetSubs) => {
  if (productId) return await Subscription.findOne({ productId });

  return await Subscription.findOne({ subscriptionId });
};
export const getPlatformSubs = async () => {
  return await Subscription.find({ isPlatformSubscription: true });
};
