// routes
import { Router } from "express";
import { register } from "./register";
import { userRoute } from "./userRoute";
import { refreshToken } from "./refreshToken";
import { logout } from "./logout";
import { changePassword } from "./changePassword";
import { sendToken } from "./sendToken";
import { getAccessData } from "./getAccessData";
import { registerWare, userWare, validateWare } from "@middleware/auth";
import { requireUser } from "@middleware/auth/requireUser";

const route = Router();

// get
route.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
route.get("/user/:username", userWare, userRoute);
route.get("/access-token", requireUser, getAccessData);
// post
route.post("/register", registerWare, register, sendToken);
route.post("/login", userWare, sendToken);
route.post("/refresh-token", requireUser, refreshToken);
route.post("/change-password", validateWare, changePassword);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
route.post("/forgot-password", userWare, changePassword);
// log out
route.delete("/logout", requireUser, logout);

export default route;
