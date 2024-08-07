/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file

import { heroWare } from "@middleware/app";
import { minAppData } from "@routes/minAppData";
import { Router } from "express";
import { addPost } from "./addPost";
import { fetchPosts } from "./fetchPosts";

const route = Router();
// fetch calendar
route.get("/:appId", fetchPosts);
route.get("/", fetchPosts);
// // add calendar
route.post("/create/:appId", heroWare, addPost, minAppData);
// // update calendar
// route.put("/update/:appId", adminWare, requireCalendar, updateCalendar, minAppData);
// // add calendar event
// route.post("/:appId/add-event", authenticateCalendar, addEvent, minAppData);

export default route;
