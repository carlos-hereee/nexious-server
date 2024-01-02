const Calendar = require("../../schema/calendar");

export = async ({ pageId }) => {
  return await Calendar.findOneAndDelete({ pageId });
};
