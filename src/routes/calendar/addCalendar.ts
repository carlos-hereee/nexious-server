import { CalendarRequest } from "@app/request";
import Calendar from "@db/schema/calendar";
import { NextFunction, Response } from "express";

export const addCalendar = async (req: CalendarRequest, _res: Response, next: NextFunction) => {
  const hero = req.asset || "";
  const { name } = req.body;
  // link appId to calendar
  const appId = req.project.appId;
  const calendar = await Calendar.create({ name, hero, appId });
  // link calendar to project
  req.project.calendar = calendar._id;
  await req.project.save();
  next();
};
