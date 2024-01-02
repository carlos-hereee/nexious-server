const Store = require("../../schema/store");

export = async (payload) => {
  return await Store.create(payload);
};
