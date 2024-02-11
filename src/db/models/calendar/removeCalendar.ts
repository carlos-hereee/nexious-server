import { CalendarFilters } from "@app/calendar";
import Calendar from "@dbSchema/calendar";

export const removeCalendar = async ({ calendarId }: CalendarFilters) => {
  return await Calendar.findOneAndDelete({ calendarId });
};
