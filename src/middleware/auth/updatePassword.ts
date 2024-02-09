import { generateHash } from "@authUtils/generateHash";
import { makeSession } from "@authUtils/makeSession";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      // update password and genereate new sessionId (should log everyone out)
      const sessionId = makeSession(req.user.userId);
      req.user.auth.sessionId = sessionId;
      // new to history add old password to history
      req.user.auth.password = generateHash(req.body.newPassword);
      await req.user.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
