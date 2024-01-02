import useGenericErrors  from "../../utils/auth/useGenericErrors";
import storeCookies  from "../../utils/cookies/storeCookies";

module.exports = async (req, res) => {
  try {
    // create new cookies
    const { accessToken } = storeCookies(res, req.user.username, req.user.auth.sessionId);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
