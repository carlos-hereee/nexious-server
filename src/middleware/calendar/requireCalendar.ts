import { CalendarRequest } from "types/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getCalendar } from "@db/models/calendar/getCalendar";
import { NextFunction, Response } from "express";

export const requireCalendar = async (req: CalendarRequest, res: Response, next: NextFunction) => {
  try {
    const appId = req.params.appId;
    const calendar = await getCalendar({ appId });
    if (calendar) req.calendar = calendar;
    next();
  } catch (error) {
    useGenericErrors(res, error, "Calendar not found ");
  }
};
