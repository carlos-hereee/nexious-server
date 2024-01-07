import App from "@dbSchema/app";

export const createApp = async (payload) => {
  return await App.create(payload);
};
