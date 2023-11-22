const Calendar = require("../../schema/calendar");

module.exports = async ({ appId, calendarId, adminIds }) => {
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
