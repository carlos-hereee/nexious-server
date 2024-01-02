import updateUser from "@dbModels/users/updateUser";
import resetCookies from "../../utils/cookies/resetCookies";

export = (req, res) => {
  // invalidate session
  await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
  resetCookies(res);
  res.status(202).end();
};
