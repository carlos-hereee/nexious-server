import { Date, Document } from "mongoose";
import { ObjectId } from "./db";

export interface EventAttendees {
  uid?: string;
  userId: string;
  avatar: string;
  name: string;
  username?: string;
  email?: string;
  phone?: number;
}
export interface IEvent {
  uid: string;
  eventId: string;
  date: Date;
  startTime: string;
  name: string;
  details: string;
  endTime: string;
  isOpen: boolean;
  attendees: EventAttendees[];
}

export interface IEventSchema extends IEvent, Document {
  date: Date;
  hero: string;
  frequency: string;
  _id: ObjectId;
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
  workWeek: string;
  calendarLink: string;
  altHours: boolean;
  startTime: string;
  closeTime: string;
  name: string;
  theme: string;
  schedule: ObjectId[];
  events: ObjectId[];
  appId: string;
  // adminIds: { userId: ObjectId; role: string }[];
}
export interface CalendarBody {
  name: string;
  workWeek: string;
  startTime: string;
  closeTime: string;
  theme: string;
  altHours: string;
}
