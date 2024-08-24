import { CalendarRequest } from "@app/request";
import Events from "@db/schema/events";
import { addNotification } from "@utils/app/addNotification";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

interface CalEvent {
  date: string;
  name: string;
  startTime: string;
  endTime: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addEvent = async (req: CalendarRequest<CalEvent>, res: Response, next: NextFunction) => {
  try {
    // key var
    const calendarId = req.calendar._id;
    // create event
    const event = await Events.create({ ...req.body, calendarId, attendees: [] });
    // add event to db
    if (event) {
      req.calendar.events.push(event._id);
      await req.calendar.save();
    }
    if (req.project) {
      // create notification
      const n = await addNotification({
        type: "calendarChanges",
        message: "Successfully added calendar event",
        user: req.user,
      });
      // save notification to db
      if (n) {
        req.project.notifications.push(n._id);
        await req.project.save();
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add event to calendar");
  }
};
