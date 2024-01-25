import type { GetUserProps } from "@app/user.js";
import Users from "@dbSchema/users.js";

export const getUserAuth = async (props: GetUserProps) => {
  const { username, sessionId } = props;
  const selectOption = "+auth.salt +auth.password +auth.sessionId +auth.passwordHistory";
  if (username) {
    return await Users.findOne({ username }).select(selectOption).populate({
      path: "ownedApps",
      select: "appId appName owner adminIds logo themeList",
    });
  }
  if (sessionId) {
    return await Users.findOne({ "auth.sessionId": sessionId }).select(selectOption).populate({
      path: "ownedApps",
      select: "appId appName owner adminIds logo themeList",
    });
  }
  return null;
};
