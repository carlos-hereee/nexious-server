// import { RequestHandler } from "express";
import { authenticatePassword } from "./authenticatePassword";
import { authenticateUser } from "./authenticateUser";
import { requireUser } from "./requireUser";
import { validateUser } from "./validateUser";

// export const userWare = [validateUser as unknown as RequestHandler, requireUser as unknown as RequestHandler];
export const userWare = [validateUser, requireUser];
export const validateWare = [validateUser, requireUser, authenticatePassword];
export const registerWare = [validateUser, authenticateUser];
