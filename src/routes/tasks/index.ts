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
import { postMessageReply } from "@middleware/app/postMessageReply";
import { requireMessage } from "@middleware/app/requireMessage";
import { updateBoardList } from "./updateBoardList";
import { inviteMember } from "./inviteMember";
import { updateBoardInvitations } from "./updateBoardInvitations";
import { assignMemberToTask } from "./assignMemberToTask";

const route = Router();

route.get("/", getTaskBoard);
route.get("/all", getAllTaskBoard);
route.get("/:boardId", requireTaskBoard, populateTaskBoard);
route.get("/:boardId/invite", requireTaskBoard, inviteMember);
// build task board
route.post("/:appId/build", appAdminWare, buildBoard, populateTaskBoard);
route.post("/build", buildBoard, populateTaskBoard);
// add to task task board
route.post("/:boardId/list/:listId/task", requireTaskBoard, createTask, populateTaskBoard);
// add comments to task
route.post("/:boardId/task/:taskId/comment", requireTaskBoard, postTaskComment, populateTaskBoard);
route.post("/:boardId/task/comment/:messageId", requireTaskBoard, requireMessage, postMessageReply, populateTaskBoard);
// update task board
route.put("/update/:boardId", updateBoard);
route.put("/update/list/:boardId", requireTaskBoard, updateBoardList, populateTaskBoard);
route.put("/:boardId/invite", requireTaskBoard, updateBoardInvitations, populateTaskBoard);
// assign user to task
route.put("/:boardId/assign/:taskId/:userId", requireTaskBoard, assignMemberToTask, populateTaskBoard);
route.delete("/:boardId/list/:listId/task/:taskId", requireTaskBoard, deleteTaskFromList, populateTaskBoard);

export default route;
