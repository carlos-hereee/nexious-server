import { authenticatePassword } from "./authenticatePassword";
import { requireUniqueUser } from "./requireUniqueUser";
import { requireUser } from "./requireUser";
import { validateUser } from "./validateUser";

// export const userWare = [validateUser as unknown as RequestHandler, requireUser as unknown as RequestHandler];
export const userWare = [validateUser, requireUser];
export const validateWare = [validateUser, requireUser, authenticatePassword];
export const registerWare = [validateUser, requireUniqueUser];
