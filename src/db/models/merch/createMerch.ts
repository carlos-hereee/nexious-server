import Merch from "@dbSchema/merch";

export = async (payload) => {
  return await Merch.create(payload);
};
