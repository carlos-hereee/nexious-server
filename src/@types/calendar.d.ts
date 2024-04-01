import { Date, Document } from "mongoose";
import { ObjectId } from "./db";

export interface EventAttendees {
  uid: string;
  userId: ObjectId;
  username: string;
  email: string;
  phone: number;
}
export interface IEvent {
  uid: string;
  eventId: string;
  date: Date;
  start: string;
  end: string;
  isOpen: boolean;
  attendees: EventAttendees[];
}

export interface IEventSchema extends Document {
  eventId: string;
  calendarId: ObjectId;
  date: Date;
  hero: string;
  events: IEvent[];
}
export interface CalendarFilters {
  appId?: string;
  calendarId?: string;
  adminIds?: string;
}
export interface ICalendarSchema extends Document {
  calendarId: string;
  _id: ObjectId;
  hero: string;
  name: string;
  theme: string;
  schedule: { eventId: ObjectId }[];
  appId: string;
  // adminIds: { userId: ObjectId; role: string }[];
}
export interface CalendarBody {
  name: string;
  theme: string;
}
