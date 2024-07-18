import { IEventSchema } from "@app/calendar";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const eventSchema = new Schema<IEventSchema>(
  {
    eventId: { type: String, require: true, unique: true, default: v4 },
    calendarId: { type: Schema.Types.ObjectId, ref: "Calendar", require: true },
    hero: { type: String, ref: "Hero" },
    date: { type: Schema.Types.Date, require: true },
    events: [
      {
        uid: { type: String, require: true, default: v4 },
        eventId: { type: String, default: v4 },
        date: { type: Date, require: true },
        start: { type: String, require: true },
        end: { type: String, require: true },
        isOpen: { type: Boolean },
        attendees: [
          {
            uid: { type: String, require: true, default: v4 },
            userId: { type: Schema.Types.ObjectId, ref: "Users" },
            username: { type: String },
            email: { type: String },
            phone: { type: Number },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
const Events = mongoose.model("Events", eventSchema);
export default Events;
