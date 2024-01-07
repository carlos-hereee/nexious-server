import Calendar from "@dbSchema/calendar";

export = async ({ pageId }) => {
  return await Calendar.findOneAndDelete({ pageId });
};
