import Calendar from "@dbSchema/calendar.js";

export const removeCalendar = async ({ pageId }) => {
  return await Calendar.findOneAndDelete({ pageId });
};
