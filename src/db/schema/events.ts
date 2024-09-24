import { IEventSchema } from "@app/calendar";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const eventSchema = new Schema<IEventSchema>(
  {
    eventId: { type: String, default: v4 },
    hero: { type: String },
    date: { type: Schema.Types.Date, require: true },
    frequency: { type: String, default: "" },
    uid: { type: String, default: v4 },
    name: { type: String, default: "" },
    details: { type: String, default: "" },
    startTime: { type: String },
    endTime: { type: String },
    isOpen: { type: Boolean, default: true },
    attendees: {
      type: [
        {
          uid: { type: String, require: true, default: v4 },
          userId: { type: String },
          username: { type: String },
          avatar: { type: String },
          name: { type: String },
          email: { type: String },
          phone: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
const Events = mongoose.model("Events", eventSchema);
export default Events;
