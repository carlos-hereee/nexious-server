/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
// routes
import { Router } from "express";
import { register } from "./register";
import { userRoute } from "./userRoute";
import { refreshSession } from "@middleware/auth/refreshSession";
import { logout } from "./logout";
import { changePassword } from "./changePassword";
import { sendToken } from "./sendToken";
import { getAccessData } from "./getAccessData";
import { authSessionWare, registerWare, userWare, validateWare } from "@middleware/auth";
import { requireUser } from "@middleware/auth/requireUser";
import { aquireAuthSession } from "@middleware/auth/authSession";
import { editUser } from "./editUser";
import { minUserData } from "./minUserData";
import { removeNotification } from "./removeNotification";

const route = Router();

// get
route.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
route.get("/user/:username", userWare, userRoute);
route.get("/access-token", requireUser, getAccessData);
// post
route.post("/register", registerWare, register, sendToken);
route.post("/login", validateWare, refreshSession, sendToken);
route.post("/refresh-token", requireUser, authSessionWare, refreshSession, sendToken);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
route.post("/change-password/:username", userWare, authSessionWare, changePassword, refreshSession, sendToken);
route.post("/forgot-password/:username", userWare, authSessionWare, changePassword, refreshSession, sendToken);
// edit user data
route.put("/update-user", userWare, editUser, minUserData);
// log out
route.delete("/logout", requireUser, aquireAuthSession, logout);
route.delete("/remove-notification/:notificationId", requireUser, removeNotification, minUserData);

export default route;
