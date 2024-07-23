import { CalendarRequest } from "@app/request";
import { Response } from "express";

export const fetchCalendar = async (req: CalendarRequest, res: Response) => {
  await req.calendar.populate("events schedule");
  res.status(202).json(req.calendar).end();
};
