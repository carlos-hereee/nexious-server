const Store = require("../../schema/store");

module.exports = async (payload) => {
  return await Store.create(payload);
};
