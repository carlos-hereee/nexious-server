// import getUser  from "@dbModels/users/getUser";
import makeSession from "../../utils/auth/makeSession";
import useGenericErrors from "../../utils/auth/useGenericErrors";
import storeCookies from "../../utils/cookies/storeCookies";

export = (req, res) => {
  try {
    // access granted: generate new sessionId
    const sessionId = makeSession(req.user.userId);
    req.user.auth.sessionId = sessionId;
    await req.user.save();
    // create  cookies
    // const user = await getUser({ userId: req.user.userId });
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    // console.log("accessToken :>> ", accessToken);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
