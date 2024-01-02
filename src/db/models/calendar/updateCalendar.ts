const Calendar = require("../../schema/calendar");

module.exports = async ({ pageId }, payload) => {
  return await Calendar.updateOne({ pageId }, { $set: payload });
};
