import Calendar from "@dbSchema/calendar";

export const removeCalendar = async ({ pageId }) => {
  return await Calendar.findOneAndDelete({ pageId });
};
