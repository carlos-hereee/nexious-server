const mongoose = require("mongoose");
const { v4 } = require("uuid");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    calendarId: { type: String, require: true, unique: true, default: v4 },
    appId: { type: Schema.Types.ObjectId, ref: "App", require: true },
    adminIds: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "Users", require: true },
        role: { type: String },
      },
    ],
    hero: { type: Schema.Types.ObjectId, ref: "Hero" },
    title: { type: String },
    theme: { type: String },
    schedule: [{ eventId: { type: Schema.Types.ObjectId, ref: "Events" } }],
  },
  { timestamps: true }
);
const Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;
