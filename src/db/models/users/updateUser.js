const { Users } = require("../../schema/users");

module.exports = async ({ userId }, payload) => {
  return await Users.updateOne({ userId }, { $set: payload });
};
