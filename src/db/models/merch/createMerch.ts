const Merch = require("../../schema/merch");

export = async (payload) => {
  return await Merch.create(payload);
};
