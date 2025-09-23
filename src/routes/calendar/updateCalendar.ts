import { CalendarRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { generateStringUrl } from "@utils/app/generateUrl";
import { addNotification } from "@utils/app/addNotification";
import { v4 } from "uuid";

export const updateCalendar = async (req: CalendarRequest, _res: Response, next: NextFunction) => {
  const hero = req.asset || "";
  const { appName } = req.project;
  // update if values exists
  if (req.calendar.hero !== hero) req.calendar.hero = hero;
  if (req.body.name) {
    req.calendar.name = req.body.name;
    req.calendar.calendarLink = "/booking/" + generateStringUrl(appName);
    // update app menu link
    req.project.menu = req.project.menu.map((m) => {
      if (m.category === "calendar") return { ...m, link: req.calendar.calendarLink };
      return m;
    });
  }
  if (req.body.workWeek) {
    req.calendar.workWeek = req.body.workWeek;
    // Hours of operation
    req.project.hoursOfOperation  = req.body.workWeek
      .split(",")
      .filter(day => day) // remove empty strings
      .map(day => ({ value: day, uid: v4(), details: `${req.body.startTime} - ${req.body.closeTime}` }));
  }
  if (req.body.startTime) req.calendar.startTime = req.body.startTime;
  if (req.body.closeTime) req.calendar.closeTime = req.body.closeTime;
  if (req.body.theme) req.calendar.theme = req.body.theme;
  // add notification
  const n = await addNotification({ type: "calendarChanges", message: "succesfully update calendar data", user: req.user });
  if (n) req.project.notifications.push(n._id);
  // save to db
  await req.calendar.save();
  await req.project.save();
  next();
};
