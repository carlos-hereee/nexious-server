const Merch = require("../../schema/merch");

module.exports = async (payload) => {
  return await Merch.create(payload);
};
