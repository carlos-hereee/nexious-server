// import { generateHash } from "@utils/auth/generateHash";
// import { random } from "./makeSession";
// import type { AuthRequest } from "@app/request";

// export const updateSession = async (req: AuthRequest) => {
//   const salt = random();
//   const sessionId = generateHash(salt, req.user.userId);
//   req.auth.sessionId = sessionId;
//   await req.auth.save();
// };
