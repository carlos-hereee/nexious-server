const mongoose = require("mongoose");
const { appId } = require("../../../config.env");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    calendarId: { type: String, require: true, unique: true },
    appId: { type: String, require: true, default: appId },
    adminId: { type: String, require: true },
    userId: { type: String },
    heroId: { type: String },
    tittle: { type: String },
    theme: { type: String },
    events: [{ eventId: { type: String } }],
  },
  { timestamps: true }
);
const Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;
