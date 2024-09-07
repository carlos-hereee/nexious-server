/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { buildBoard } from "./buildBoard";
import { appAdminWare } from "@middleware/app";
import { getAllTaskBoard, getTaskBoard } from "./getTaskBoard";
import { updateBoard } from "./updateBoard";
import { getTaskBoardWithBoardId } from "./getTaskBoardWithBoardId";
import { createTask } from "./createTask";
import { requireTaskBoard } from "@middleware/app/requireTaskBoard";

const route = Router();

// build task board
route.get("/", getTaskBoard);
route.get("/all", getAllTaskBoard);
route.get("/:boardId", requireTaskBoard, getTaskBoardWithBoardId);
// route.get("/:id", getTaskBoardWithId);
route.post("/build", appAdminWare, buildBoard);
route.post("/:boardId/list/:listId/task", requireTaskBoard, createTask);
route.put("/update/:boardId", appAdminWare, updateBoard);

export default route;
