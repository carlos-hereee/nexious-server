import { createUser } from "@dbModels/users/createUser";
import { generateHash } from "@authUtils/generateHash";
import { v4 } from "uuid";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";
import { random } from "@authUtils/makeSession";

export const register = async (req: Request, res: Response, next: NextFunction) => {
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
