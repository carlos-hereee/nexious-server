const Calendar = require("../../schema/calendar");

export = async ({ pageId }, payload) => {
  return await Calendar.updateOne({ pageId }, { $set: payload });
};
