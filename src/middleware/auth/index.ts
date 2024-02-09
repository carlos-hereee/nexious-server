import { addPassHistory } from "./addPassHistory";
import { authenticatePassword } from "./authenticatePassword";
import { authenticateUser } from "./authenticateUser";
import { requireUser } from "./requireUser";
import { updatePassword } from "./updatePassword";
import { validateUser } from "./validateUser";

export const userWare = [validateUser, requireUser];
export const validateWare = [validateUser, requireUser, authenticatePassword];
export const changePasswordWare = [addPassHistory, updatePassword];
export const registerWare = [validateUser, authenticateUser];
