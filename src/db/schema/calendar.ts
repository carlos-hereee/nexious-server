import { ICalendarSchema } from "types/calendar";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const calendarSchema = new Schema<ICalendarSchema>(
  {
    calendarId: { type: String, require: true, unique: true, default: v4 },
    appId: { type: String, require: true },
    hero: { type: String },
    name: { type: String },
    theme: { type: String },
    calendarLink: { type: String, default: "" },
    workWeek: { type: String, default: "" },
    startTime: { type: String, default: "" },
    closeTime: { type: String, default: "" },
    altHours: { type: Boolean, default: false },
    schedule: [{ eventId: { type: Schema.Types.ObjectId, ref: "Events" } }],
  },
  { timestamps: true }
);
const Calendar = mongoose.model("Calendar", calendarSchema);
export default Calendar;
