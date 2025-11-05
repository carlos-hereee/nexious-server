/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { assetWare } from "@middleware/assets";
import { addPost } from "@routes/post/addPost";
import { minAppData } from "@routes/minAppData";
import { requireUser } from "@middleware/auth/requireUser";
import { updateLocale } from "./updateLocale";
import { sendUserMessage } from "@routes/user/sendUserMessage";
// import { addTaskBoard } from "./addTaskBoard";

const route = Router();

// route.get("/", addUserPost);
route.post("/add-post", assetWare, addPost, minAppData);
route.post("/send-message/:userId", sendUserMessage, minAppData);
// route.post("/task-board", addTaskBoard, minAppData);

// TODO: ADD ADDITION VERIFICATION
route.put("/locale", requireUser, updateLocale);

export default route;
