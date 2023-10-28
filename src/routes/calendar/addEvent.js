const { v4 } = require("uuid");

module.exports = (req, res) => {
  const { appId, userId, role } = req.user;
  const { date } = req.body;
  const eventId = v4();
  console.log("req.calendar", req.calendar);
  //
  if (role === "admin") {
    let calendar = { calendarId: v4(), adminId: userId };
    let event = { eventId, date };
  }
  // todo save and send response
  // console.log("req.user", req.user);
  // console.log("req.body", req.body);
};
