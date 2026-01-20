/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { adminWare } from "@middleware/app";
import { postMessageReply } from "@middleware/app/postMessageReply";
import { requireMessage } from "@middleware/app/requireMessage";
import { requireTaskBoard } from "@middleware/app/requireTaskBoard";
import { Router } from "express";
import { assignMemberToTask } from "./assignMemberToTask";
import { buildBoard } from "./buildBoard";
import { createTask } from "./createTask";
import { deleteTaskFromList } from "./deleteTaskFromList";
import { getAllAppTaskBoard, getAllTaskBoard, getAllUserTaskBoard } from "./getTaskBoard";
import { getTaskCardById } from "./getTaskCardById";
import { inviteMember } from "./inviteMember";
import { populateTaskBoard } from "./populateTaskBoard";
import { postTaskComment } from "./postTaskComment";
import { updateBoard } from "./updateBoard";
import { updateBoardInvitations } from "./updateBoardInvitations";
import { updateBoardList } from "./updateBoardList";

const route = Router();

// all task boards
route.get("/all", getAllTaskBoard);
// all task boards for app
route.get("/all/:appId", getAllAppTaskBoard);
// all task boards for user
route.get("/user/:userId", getAllUserTaskBoard);
// get taskcard with card Id
route.get("/card/:cardId", getTaskCardById);
// get specific task board
route.get("/:boardId", requireTaskBoard, populateTaskBoard);
route.get("/app/:boardId", requireTaskBoard, populateTaskBoard);
route.get("/:boardId/invite", requireTaskBoard, inviteMember);
// build task board
route.post("/:appId/build", ...adminWare, buildBoard, populateTaskBoard);
route.post("/build", buildBoard, populateTaskBoard);
// add to task task board
route.post("/:boardId/list/:listId/task", requireTaskBoard, createTask, populateTaskBoard);
// add comments to task
route.post("/:boardId/task/:taskId/comment", requireTaskBoard, postTaskComment, populateTaskBoard);
route.post("/:boardId/task/comment/:messageId", requireTaskBoard, requireMessage, postMessageReply, populateTaskBoard);
// update task board
route.put("/update/:boardId", requireTaskBoard, updateBoard);
route.put("/list/:boardId", requireTaskBoard, updateBoardList);
route.put("/:boardId/invite", requireTaskBoard, updateBoardInvitations, populateTaskBoard);
// assign user to task
route.put("/:boardId/assign/:taskId/:userId", requireTaskBoard, assignMemberToTask, populateTaskBoard);
route.delete("/:boardId/list/:listId/task/:taskId", requireTaskBoard, deleteTaskFromList, populateTaskBoard);

export default route;
