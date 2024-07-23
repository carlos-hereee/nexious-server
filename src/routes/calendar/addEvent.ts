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
      const notification = await addNotification({ type: "cal-event", message: "Successfully added calendar event" });
      // save notification to db
      if (notification) {
        req.project.notifications.push(notification._id);
        await req.project.save();
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add event to calendar");
  }
};
