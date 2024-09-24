import { ICalendarSchema } from "@app/calendar";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const calendarSchema = new Schema<ICalendarSchema>(
  {
    calendarId: { type: String, unique: true, default: v4 },
    appId: { type: String },
    hero: { type: String },
    name: { type: String },
    theme: { type: String },
    calendarLink: { type: String, default: "" },
    workWeek: { type: String, default: "" },
    startTime: { type: String, default: "" },
    closeTime: { type: String, default: "" },
    altHours: { type: Boolean, default: false },
    schedule: { type: [{ type: Schema.Types.ObjectId, ref: "Events" }], default: [] },
    events: { type: [{ type: Schema.Types.ObjectId, ref: "Events" }], default: [] },
  },
  { timestamps: true }
);
const Calendar = mongoose.model("Calendar", calendarSchema);
export default Calendar;
