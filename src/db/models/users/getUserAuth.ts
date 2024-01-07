import Users from "@dbSchema/users";
import type { UserSchemaProps } from "db-user";

export = async (props: UserSchemaProps) => {
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
};