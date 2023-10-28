const { Users } = require("../../schema/users");

module.exports = async ({ username, email, userId, all, appId }) => {
  if (username) {
    return await Users.findOne({ username });
  }
  if (userId) {
    // send data required by client
    return await Users.findOne({ userId }).populate({
      path: "ownedApps",
      select: "logo appName appId ownerId",
      populate: { path: "logo" },
    });
  }
  if (email) {
    return await Users.findOne({ email });
  }
  if (appId) {
    return await Users.find({ appId });
  }
  if (all) {
    return await Users.find();
  }
};
