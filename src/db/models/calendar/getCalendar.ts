const Calendar = require("../../schema/calendar");

export = async ({ appId, calendarId, adminIds }) => {
  if (adminIds) {
    return await Calendar.find({ adminIds });
  }
  if (calendarId) {
    return await Calendar.find({ calendarId });
  }
  if (appId) {
    return await Calendar.find({ appId });
  }
};
