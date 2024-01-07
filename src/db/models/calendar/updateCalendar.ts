import Calendar from "@dbSchema/calendar";

export = async ({ pageId }, payload) => {
  return await Calendar.updateOne({ pageId }, { $set: payload });
};
