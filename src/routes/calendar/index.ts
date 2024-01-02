const router = require("express").Router();
const requireUser = require("../../middleware/auth/requireUser");
const { getCalendar } = require("../../middleware/calendar");
const addEvent = require("./addEvent");
const fetchCalendar = require("./fetchCalendar");

const authenticateCalendar = [requireUser, getCalendar];

router.get("/", authenticateCalendar, fetchCalendar);
router.post("/add-event", authenticateCalendar, addEvent);

module.exports = router;
