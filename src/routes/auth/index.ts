// routes
import { Router } from "express";
import { register } from "./register";
import { userRoute } from "./userRoute";
import { getWithUsername } from "./getWithUsername";
import { refreshToken } from "./refreshToken";
import { logout } from "./logout";
import { changePassword } from "./changePassword";
import { sendToken } from "./sendToken";
import { getAccessData } from "./getAccessData";
import { changePasswordWare, registerWare, userWare, validateWare } from "@middleware/auth";
import { requireUser } from "@middleware/auth/requireUser";

const route = Router();

// get
route.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
route.get("/user/:username", userWare, getWithUsername);
route.get("/access-token", requireUser, getAccessData);
// post
route.post("/register", registerWare, register, sendToken);
route.post("/login", validateWare, sendToken);
route.post("/refresh-token", requireUser, refreshToken);
route.post("/change-password", validateWare, changePasswordWare);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
route.post("/forgot-password", userWare, changePasswordWare, changePassword);
// log out
route.delete("/logout", requireUser, logout);

export default route;
