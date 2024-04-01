import { ICalendarSchema } from "@app/calendar";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const calendarSchema = new Schema<ICalendarSchema>(
  {
    calendarId: { type: String, require: true, unique: true, default: v4 },
    appId: { type: String, require: true },
    // adminIds: [
    //   {
    //     userId: { type: Schema.Types.ObjectId, ref: "Users", require: true },
    //     role: { type: String },
    //   },
    // ],
    hero: { type: String },
    name: { type: String },
    theme: { type: String },
    schedule: [{ eventId: { type: Schema.Types.ObjectId, ref: "Events" } }],
  },
  { timestamps: true }
);
const Calendar = mongoose.model("Calendar", calendarSchema);
export default Calendar;
