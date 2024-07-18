import { CalendarRequest } from "@app/request";
import { Response } from "express";
// import { v4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addEvent = (req: CalendarRequest, _res: Response) => {
  if (req.user) {
    // const { userId } = req.user;
    // const { date } = req.body;
    // const eventId = v4();
    console.log("req.calendar", req.calendar);
    //
    // if (role === "admin") {
    //   let calendar = { calendarId: v4(), adminIds: userId };
    //   let event = { eventId, date };
    // }
  }
  // todo save and send response
  // console.log("req.user", req.user);
  // console.log("req.body", req.body);
};
