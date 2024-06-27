import { generateHash } from "@utils/auth/generateHash";
import { v4 } from "uuid";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { random } from "@utils/auth/makeSession";
import type { AuthRequest } from "@app/request";
import Auth from "@db/schema/auth";
import Users from "@db/schema/users";

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const username = req.body.username;
    const email = req.body.email || "";
    const phone = req.body.phone || 0;
    const userId = v4();
    const salt = random();
    // save protect password with hash-encryption
    const password = generateHash(salt, req.body.password);
    const sessionId = generateHash(salt, userId);
    req.auth = await Auth.create({ salt, password, sessionId, passwordHistory: [password] });
    req.user = await Users.create({ userId, email, username, phone, auth: req.auth._id });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
