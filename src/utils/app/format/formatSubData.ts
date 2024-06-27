import type { AccountTier } from "@app/user";

export const formatSubFeatureData = (subscription: AccountTier) => {
  return Object.keys(subscription).map((featureName) => {
    return {
      featureName,
      featureValue: subscription[featureName as keyof AccountTier],
      featureValueType: typeof subscription[featureName],
    };
  });
};
