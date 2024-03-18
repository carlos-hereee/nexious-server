import { CalendarRequest } from "@app/request";
import { Response } from "express";

export const fetchCalendar = (req: CalendarRequest, res: Response) => {
  res.status(202).json(req.calendar);
};
