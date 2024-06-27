export const formatSubFeatureData = (subscription: { name: string; value: string; valueType: string }[]) => {
  return subscription.map((feature) => {
    return {
      featureName: feature.name,
      featureValue: feature.value,
      featureValueType: feature.valueType,
    };
  });
};
