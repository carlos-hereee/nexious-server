import { aquireAuthSession, requireAuthSession } from "./authSession";
import { authenticatePassword } from "./authenticatePassword";
import { requireUniqueUser, requireUser } from "./requireUser";
import { validateUser } from "./validateUser";

// export const userWare = [validateUser as unknown as RequestHandler, requireUser as unknown as RequestHandler];
export const userWare = [validateUser, requireUser];
export const authSessionWare = [aquireAuthSession, requireAuthSession];
export const validateWare = [validateUser, requireUser, aquireAuthSession, requireAuthSession, authenticatePassword];
export const registerWare = [validateUser, requireUniqueUser];
