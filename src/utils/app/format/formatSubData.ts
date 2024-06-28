import { v4 } from "uuid";

export const formatSubFeatureData = (subscription: { name: string; value: string; valueType: string }[]) => {
  return subscription.map((feature) => {
    return {
      featureId: v4(),
      featureName: feature.name,
      featureValue: feature.value,
      featureValueType: feature.valueType,
    };
  });
};
