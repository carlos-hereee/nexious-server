const Calendar = require("../../schema/calendar");

module.exports = async ({ pageId }) => {
  return await Calendar.findOneAndDelete({ pageId });
};
