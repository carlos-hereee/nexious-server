/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { assetWare } from "@middleware/assets";
import { requireUser } from "@middleware/auth/requireUser";
import { getUserMessage } from "@routes/app/getUserMessage";
import { minAppData } from "@routes/minAppData";
import { addPost } from "@routes/post/addPost";
import { sendUserMessage } from "@routes/user/sendUserMessage";
import { Router } from "express";
import { sendReply } from "./sendReply";
import { updateLocale } from "./updateLocale";
// import { addTaskBoard } from "./addTaskBoard";

const route = Router();

route.get("/messages/:messageId", getUserMessage);
route.post("/add-post", assetWare, addPost, minAppData);
route.post("/send-message/:userId", sendUserMessage, minAppData);
route.post("/reply/:userId/:messageId", sendReply, minAppData);
// route.post("/task-board", addTaskBoard, minAppData);

// TODO: ADD ADDITION VERIFICATION
route.put("/locale", requireUser, updateLocale);

export default route;
