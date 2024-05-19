import { CalendarRequest } from "@app/request";
import Calendar from "@db/schema/calendar";
import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";
import { NextFunction, Response } from "express";

export const addCalendar = async (req: CalendarRequest, _res: Response, next: NextFunction) => {
  const hero = req.asset || "";
  const { name } = req.body;
  // link appId to calendar
  const appId = req.project.appId;
  const calendar = await Calendar.create({ name, hero, appId });
  const link = req.project.appUrl.replace("/app/", "/booking/");
  const menuItem = formatMenuPageData({ pageName: "booking", category: "calendar", link, uid: calendar.calendarId });
  // link calendar to app menu
  req.project.menu.push(menuItem);
  // link calendar to project
  req.project.calendar = calendar._id;
  await req.project.save();
  next();
};
