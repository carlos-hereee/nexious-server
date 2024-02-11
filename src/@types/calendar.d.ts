import { Document } from "mongoose";
import { ObjectId } from "./db";

export interface CalendarFilters {
  appId: string;
  calendarId: string;
  adminIds: string;
}
export interface ICalendarSchema extends Document {
  calendarId: string;
  appId: ObjectId;
  hero: ObjectId;
  title: string;
  theme: string;
  schedule: { eventId: ObjectId }[];
  adminIds: { userId: ObjectId; role: string }[];
}
