/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { buildBoard } from "./buildBoard";
import { appAdminWare } from "@middleware/app";
import { getAllTaskBoard, getTaskBoard } from "./getTaskBoard";
import { updateBoard } from "./updateBoard";
import { populateTaskBoard } from "./populateTaskBoard";
import { createTask } from "./createTask";
import { requireTaskBoard } from "@middleware/app/requireTaskBoard";
import { postTaskComment } from "./postTaskComment";
import { deleteTaskFromList } from "./deleteTaskFromList";
import { postTaskReplyComment } from "./postTaskReplyComment";
import { postMessageReply } from "@middleware/app/postMessageReply";
import { requireMessage } from "@middleware/app/requireMessage";

const route = Router();

// build task board
route.get("/", getTaskBoard);
route.get("/all", getAllTaskBoard);
route.get("/:boardId", requireTaskBoard, populateTaskBoard);
route.post("/build", appAdminWare, buildBoard);
route.post("/:boardId/list/:listId/task", requireTaskBoard, createTask, populateTaskBoard);
route.post("/:boardId/task/:taskId/comment", requireTaskBoard, postTaskComment, populateTaskBoard);
route.post("/:boardId/task/comment/:messageId", requireTaskBoard, requireMessage, postMessageReply, populateTaskBoard);
route.put("/update/:boardId", appAdminWare, updateBoard);
route.delete("/:boardId/list/:listId/task/:taskId", appAdminWare, requireTaskBoard, deleteTaskFromList);

export default route;
