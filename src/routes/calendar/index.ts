/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file

import { Router } from "express";
import { addEvent } from "./addEvent";
import { fetchCalendar } from "./fetchCalendar";
import { authenticateCalendar } from "@middleware/calendar";
import { addCalendar } from "./addCalendar";
import { adminWare, heroWare } from "@middleware/app";
import { updateCalendar } from "./updateCalendar";
import { requireCalendar } from "@middleware/calendar/requireCalendar";
import { minAppData } from "@routes/app/minAppData";

const route = Router();
// fetch calendar
route.get("/:appId", authenticateCalendar, fetchCalendar);
// add calendar
route.post("/:appId", heroWare, addCalendar, minAppData);
// update calendar
route.put("/update/:appId", adminWare, requireCalendar, updateCalendar, minAppData);
// add calendar event
route.post("/:appId/add-event", authenticateCalendar, addEvent);

export default route;
