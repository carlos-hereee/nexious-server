const { Users } = require("../../schema/users");

module.exports = async ({ username, sessionId }) => {
  const selectOption = "+auth.salt +auth.password +auth.sessionId +auth.passwordHistory";
  if (username) {
    return await Users.findOne({ username }).select(selectOption).populate({
      path: "ownedApps",
      select: "appId appName ownerId adminIds logo themeList",
    });
  }
  if (sessionId) {
    return await Users.findOne({ "auth.sessionId": sessionId })
      .select(selectOption)
      .populate({
        path: "ownedApps",
        select: "appId appName ownerId adminIds logo themeList",
      });
  }
};
