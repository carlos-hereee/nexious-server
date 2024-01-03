import msg from "@data/error.message.json";

export const getCalendar = (req, res, next) => {
  const { appId } = req.user;
  req.calendar = await getCalendar({ appId });
  if (req.calendar.length) next();
  else {
    const message = msg.calendarNotFound;
    res.status(400).json(message).end();
  }
};
