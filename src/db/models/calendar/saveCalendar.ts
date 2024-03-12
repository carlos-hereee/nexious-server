import Calendar from "@db/schema/calendar";

export const saveCalendar = async (payload) => {
  // const page = new Calendar(payload);
  return await Calendar.create(payload);
};
