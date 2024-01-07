import { saveUser } from "@dbModels/users/saveUser";
import random from "@authUtils/random";
import generateHash from "@authUtils/generateHash";
import { v4 } from "uuid";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MiddlewareProps } from "@app/db";

export const register: MiddlewareProps = async (req, res, next) => {
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
