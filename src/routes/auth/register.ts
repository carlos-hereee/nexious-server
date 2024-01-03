import saveUser from "@dbModels/users/saveUser";
import random from "../../utils/auth/random";
import generateHash from "../../utils/auth/generateHash";
import { v4 } from "uuid";
import { useGenericErrors } from "../../utils/auth/useGenericErrors";

export const register = async (req, res, next) => {
  try {
    // key variables
    const username = req.body.username;
    const email = req.body.email || "";
    const phone = req.body.phone || "";
    const userId = v4();
    const salt = random();
    // save protect password with hash-encryption
    const password = generateHash(salt, req.body.password);
    const sessionId = generateHash(salt, userId);
    const auth = { salt, password, sessionId, passwordHistory: [password] };
    await saveUser({ userId, email, username, auth, phone });
    req.user.auth = auth;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
