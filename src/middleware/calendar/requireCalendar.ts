import type { RequestHandler } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { getCalendar } from "@dbModels/calendar/getCalendar.js";

export const requireCalendar: RequestHandler = async (req, res, next) => {
  try {
    const { appId } = req.params;
    req.calendar = await getCalendar({ appId });
    if (req.calendar.length) next();
  } catch (error) {
    useGenericErrors(res, error, "Calendar not found ");
  }
};
