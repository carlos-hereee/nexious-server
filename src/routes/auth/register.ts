import { createUser } from "@db/models/users/createUser";
import { generateHash } from "@utils/auth/generateHash";
import { v4 } from "uuid";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { random } from "@utils/auth/makeSession";
import { UserRequest } from "@app/request";

export const register = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const username = req.body.username;
    // const password = req.body.password;
    const email = req.body.email || "";
    const phone = req.body.phone || 0;
    const userId = v4();
    const salt = random();
    // save protect password with hash-encryption
    const password = generateHash(salt, req.body.password);
    const sessionId = generateHash(salt, userId);
    const auth = { salt, password, sessionId, passwordHistory: [password] };
    await createUser({ userId, email, username, auth, phone });

    req.auth = { userId, email, username, auth, phone };
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
