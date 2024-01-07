import router  from "express".Router();
import requireUser  from "@authWare/requireUser";
import { getCalendar }  from "../../middleware/calendar";
import addEvent  from "./addEvent";
import fetchCalendar  from "./fetchCalendar";

const authenticateCalendar = [requireUser, getCalendar];

router.get("/", authenticateCalendar, fetchCalendar);
router.post("/add-event", authenticateCalendar, addEvent);

export   =router  
