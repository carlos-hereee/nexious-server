import App from "@dbSchema/app";

export const removeApp = async ({ appId }) => {
  return await App.findOneAndDelete({ appId });
};
