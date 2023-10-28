const Calendar = require("../../schema/calendar");

module.exports = async (payload) => {
  // const page = new Calendar(payload);
  return await Calendar.create(payload);
};
