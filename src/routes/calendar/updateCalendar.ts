import { CalendarRequest } from "types/request";
import { NextFunction, Response } from "express";

export const updateCalendar = async (req: CalendarRequest, _res: Response, next: NextFunction) => {
  const hero = req.asset || "";
  // console.log("req.body :>> ", req.body);
  // update if values exists
  if (req.calendar.hero !== hero) req.calendar.hero = hero;
  if (req.body.name) req.calendar.name = req.body.name;
  if (req.body.workWeek) req.calendar.workWeek = req.body.workWeek;
  if (req.body.theme) req.calendar.theme = req.body.theme;
  await req.calendar.save();
  next();
};
