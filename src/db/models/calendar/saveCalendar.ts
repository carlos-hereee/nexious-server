import Calendar from "@dbSchema/calendar";

export = async (payload) => {
  // const page = new Calendar(payload);
  return await Calendar.create(payload);
};
