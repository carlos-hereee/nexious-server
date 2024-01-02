import Users = require("../../schema/user");

export = async ({ userId }) => {
  return await Users.findOneAndDelete({ userId });
};
