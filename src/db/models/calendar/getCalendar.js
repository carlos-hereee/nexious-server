const Calendar = require("../../schema/calendar");

module.exports = async ({ appId, calendarId, adminId }) => {
  if (adminId) {
    return await Calendar.find({ adminId });
  }
  if (calendarId) {
    return await Calendar.find({ calendarId });
  }
  if (appId) {
    return await Calendar.find({ appId });
  }
};
