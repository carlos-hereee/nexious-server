import router from "express";
import { requireUser } from "@authWare/requireUser";
import { getCalendar } from "../../middleware/calendar";
import addEvent from "./addEvent";
import fetchCalendar from "./fetchCalendar";

const authenticateCalendar = [requireUser, getCalendar];

const route = router.Router();
route.get("/", authenticateCalendar, fetchCalendar);
route.post("/add-event", authenticateCalendar, addEvent);

export default route;
