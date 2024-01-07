import App from "@dbSchema/app";

export = async ({ appId }, payload) => {
  return await App.updateOne({ appId }, { $set: payload });
};
