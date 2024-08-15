/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
// routes
import { Router } from "express";
import { register } from "./register";
import { userRoute } from "./userRoute";
import { refreshSession } from "@middleware/auth/refreshSession";
import { logout } from "./logout";
import { changePassword } from "./edits/changePassword";
import { sendToken } from "./sendToken";
import { authSessionWare, registerWare, userWare, validateWare } from "@middleware/auth";
import { requireUser } from "@middleware/auth/requireUser";
import { aquireAuthSession } from "@middleware/auth/authSession";
import { editUser } from "./edits/editUser";
import { removeNotification } from "./removeNotification";
import { upgradeAccount } from "./edits/upgradeAccount";
import { minAppData } from "@routes/minAppData";
import { getPlatformData } from "@routes/getPlatformData";
import { linkSubscription } from "./linkSubscription";
import { editAvatar } from "./edits/editAvatar";
import { assetWare } from "@middleware/app";
import { sendUserMessage } from "./sendUserMessage";

const route = Router();

// get
route.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
route.get("/user/:username", userWare, userRoute);
route.get("/access-token", requireUser, getPlatformData);
// post
route.post("/register", registerWare, register, sendToken);
route.post("/login", validateWare, refreshSession, sendToken);
route.post("/refresh-token", requireUser, authSessionWare, refreshSession, sendToken);
route.post("/avatar", assetWare, editAvatar, minAppData);
// send user message
route.post("/:userId/contact", sendUserMessage, minAppData);
// update stripe subscription
route.post("/upgrade-account", requireUser, upgradeAccount);
route.put("/link-account", requireUser, linkSubscription, minAppData);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
route.post("/change-password/:username", userWare, authSessionWare, changePassword, refreshSession, sendToken);
route.post("/forgot-password/:username", userWare, authSessionWare, changePassword, refreshSession, sendToken);
// edit user data
route.put("/update-user", userWare, editUser, minAppData);
// log out
route.delete("/logout", requireUser, aquireAuthSession, logout);
route.delete("/remove-notification/:notificationId", requireUser, removeNotification, minAppData);

export default route;
