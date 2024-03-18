/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file

import { Router } from "express";
import { addEvent } from "./addEvent";
import { fetchCalendar } from "./fetchCalendar";
import { authenticateCalendar } from "@middleware/calendar";

const route = Router();
// fetch calendar
route.get("/:appId", authenticateCalendar, fetchCalendar);
// add calendar
route.post("/:appId");
// add calendar event
route.post("/:appId/add-event", authenticateCalendar, addEvent);

export default route;
