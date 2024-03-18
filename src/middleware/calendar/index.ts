import { requireUser } from "@middleware/auth/requireUser";
import { requireCalendar } from "./requireCalendar";

export const authenticateCalendar = [requireUser, requireCalendar];
