import { CalendarRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getCalendar } from "@db/models/calendar/getCalendar";
import { NextFunction, Response } from "express";
import { getApp } from "@db/models/app/getApp";

export const requireCalendar = async (req: CalendarRequest, res: Response, next: NextFunction) => {
  try {
    const appId = req.params.appId;
    const calendar = await getCalendar({ appId });
    if (!calendar) return res.status(400).json("unale to find calendar data");
    const app = await getApp({ appId });
    req.calendar = calendar;
    if (app) req.project = app;
    next();
  } catch (error) {
    useGenericErrors(res, error, "Calendar not found ");
  }
};
