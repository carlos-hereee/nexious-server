import Calendar from "@dbSchema/calendar";

export const saveCalendar = async (payload) => {
  // const page = new Calendar(payload);
  return await Calendar.create(payload);
};
