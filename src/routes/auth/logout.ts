import { updateUser } from "@dbModels/users/updateUser";
import type { RouterProps } from "@app/db";
import resetCookies from "@authUtils/resetCookies";

export const logout: RouterProps = async (req, res) => {
  // invalidate session
  await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
  resetCookies(res);
  res.status(202).end();
};
