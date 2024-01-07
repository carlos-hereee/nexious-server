import Calendar from "@dbSchema/calendar";

export const getCalendar = async (props) => {
  const { appId, calendarId, adminIds } = props;
  if (adminIds) {
    return await Calendar.find({ adminIds });
  }
  if (calendarId) {
    return await Calendar.find({ calendarId });
  }
  if (appId) {
    return await Calendar.findOne({ appId });
  }
};
