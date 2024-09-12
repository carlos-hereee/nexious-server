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

// build task board
route.get("/", getTaskBoard);
route.get("/all", getAllTaskBoard);
route.get("/:boardId", requireTaskBoard, populateTaskBoard);
route.get("/:boardId/invite", requireTaskBoard, inviteMember);
// add to task task board
route.post("/build", appAdminWare, buildBoard);
route.post("/:boardId/list/:listId/task", requireTaskBoard, createTask, populateTaskBoard);
route.post("/:boardId/task/:taskId/comment", requireTaskBoard, postTaskComment, populateTaskBoard);
route.post("/:boardId/task/comment/:messageId", requireTaskBoard, requireMessage, postMessageReply, populateTaskBoard);
// update task board
route.put("/:boardId/assign/:taskId/:userId", requireTaskBoard, assignMemberToTask, populateTaskBoard);
route.put("/update/:boardId", appAdminWare, updateBoard);
route.put("/update/list/:boardId", appAdminWare, requireTaskBoard, updateBoardList, populateTaskBoard);
route.put("/:boardId/invite", appAdminWare, requireTaskBoard, updateBoardInvitations, populateTaskBoard);
route.delete("/:boardId/list/:listId/task/:taskId", appAdminWare, requireTaskBoard, deleteTaskFromList);

export default route;
