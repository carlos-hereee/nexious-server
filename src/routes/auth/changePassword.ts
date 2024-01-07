import { useGenericErrors } from "@authUtils/useGenericErrors";
import storeCookies from "@authUtils/storeCookies";

export = (req, res) => {
  try {
    // create new cookies
    const { accessToken } = storeCookies(res, req.user.username, req.user.auth.sessionId);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};