import App from "@dbSchema/app.js";

export const removeApp = async ({ appId }) => {
  return await App.findOneAndDelete({ appId });
};
