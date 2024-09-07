/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import { Router } from "express";
import { buildBoard } from "./buildBoard";
import { appAdminWare } from "@middleware/app";
import { getAllTaskBoard, getTaskBoard } from "./getTaskBoard";
import { updateBoard } from "./updateBoard";
import { getTaskBoardWithBoardId } from "./getTaskBoardWithBoardId";

const route = Router();

// build task board
route.get("/", getTaskBoard);
route.get("/all", getAllTaskBoard);
route.get("/:boardId", getTaskBoardWithBoardId);
// route.get("/:id", getTaskBoardWithId);
route.post("/build", appAdminWare, buildBoard);
route.put("/update/:boardId", appAdminWare, updateBoard);

export default route;
