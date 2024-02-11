import { CalendarRequest } from "@app/request";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { getCalendar } from "@dbModels/calendar/getCalendar";
import { NextFunction, Response } from "express";

export const requireCalendar = async (req: CalendarRequest, res: Response, next: NextFunction) => {
  try {
    const appId = req.params.appId;
    const calendar = await getCalendar({ appId });
    if (calendar) {
      req.calendar = calendar;
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "Calendar not found ");
  }
};
