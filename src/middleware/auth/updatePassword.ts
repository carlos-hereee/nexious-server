import generateHash from "../../utils/auth/generateHash";
import makeSession from "../../utils/auth/makeSession";
import useGenericErrors from "../../utils/auth/useGenericErrors";

export = (req, res, next) => {
  try {
    // update password and genereate new sessionId (should log everyone out)
    const sessionId = makeSession(req.user.userId);
    req.user.auth.sessionId = sessionId;
    // new to history add old password to history
    req.user.auth.password = generateHash(req.body.newPassword, 10);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
