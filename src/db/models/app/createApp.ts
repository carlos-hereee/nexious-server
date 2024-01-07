import App from "@dbSchema/app";

export = async (payload) => {
  return await App.create(payload);
};
