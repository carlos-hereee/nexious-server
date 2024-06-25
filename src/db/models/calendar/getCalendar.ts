import { CalendarFilters } from "types/calendar";
import Calendar from "@db/schema/calendar";

export const getCalendar = async ({ appId }: CalendarFilters) => {
  if (appId) return await Calendar.findOne({ appId });
};
export const getAllCalendars = async ({ adminIds, calendarId }: CalendarFilters) => {
  if (adminIds) {
    return await Calendar.find({ adminIds });
  }
  if (calendarId) {
    return await Calendar.find({ calendarId });
  }
};
