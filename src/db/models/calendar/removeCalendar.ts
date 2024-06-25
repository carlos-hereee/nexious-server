import { CalendarFilters } from "types/calendar";
import Calendar from "@db/schema/calendar";

export const removeCalendar = async ({ calendarId }: CalendarFilters) => {
  return await Calendar.findOneAndDelete({ calendarId });
};
