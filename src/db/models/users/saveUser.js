const { Users } = require("../../schema/users");

module.exports = async (payload) => {
  return await Users.create(payload);
};
