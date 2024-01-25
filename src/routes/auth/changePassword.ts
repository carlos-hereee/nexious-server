import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { storeCookies } from "@authUtils/storeCookies.js";

export const changePassword = (req, res) => {
  try {
    // create new cookies
    const { accessToken } = storeCookies(res, req.user.username, req.user.auth.sessionId);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to change password");
  }
};
