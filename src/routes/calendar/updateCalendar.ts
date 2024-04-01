import { CalendarRequest } from "@app/request";
import { NextFunction, Response } from "express";

export const updateCalendar = async (req: CalendarRequest, _res: Response, next: NextFunction) => {
  const hero = req.asset || "";
  // update if values exists
  if (req.calendar.hero !== hero) req.calendar.hero = hero;
  if (req.body.name) req.calendar.name = req.body.name;
  if (req.body.theme) req.calendar.theme = req.body.theme;
  await req.calendar.save();
  next();
};
