import App from "@dbSchema/app";

export = async ({ appId }) => {
  return await App.findOneAndDelete({ appId });
};
