/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file

import { appWare, heroWare, messageWare, postWare } from "@middleware/app";
import { minAppData } from "@routes/minAppData";
import { Router } from "express";
import { addPost } from "./addPost";
import { fetchPosts } from "./fetchPosts";
import { postReply } from "./postReply";
import { toggleLikePost } from "./toggleLikePost";
import { postMessageReply } from "@middleware/app/postMessageReply";
import { toggleMessageLike } from "./toggleMessageLike";
import { deletePost } from "./deletePost";

const route = Router();
// fetch posts
route.get("/:appId", fetchPosts);
route.get("/", fetchPosts);
// // create post
route.post("/create/:appId", heroWare, addPost, minAppData);
route.post("/post-reply/:postId", postWare, postReply, minAppData);
route.post("/post-message-reply/:messageId", messageWare, postMessageReply, minAppData);
// user actions
route.put("/toggle-like-post/:postId", postWare, toggleLikePost, minAppData);
route.put("/toggle-like-message/:messageId", messageWare, toggleMessageLike, minAppData);
// delete post
route.delete("/:appId/:postId", appWare, postWare, deletePost, minAppData);

// // add calendar event
// route.post("/:appId/add-event", authenticateCalendar, addEvent, minAppData);

export default route;
