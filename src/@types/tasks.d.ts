import type { Document } from "mongoose";
import { ObjectId } from "./db";

export type TaskStatus = "incomplete" | "complete";

export interface UserData {
  name: string;
  avatar: string;
  role: string;
  invitationStatus: "accepted" | "declined" | "pending";
  userId: string;
}
export interface Task {
  uid?: string;
  taskId?: string;
  assignedTo?: UserData[];
  name: string;
  description: string;
  dueDate: string;
  dueTime: string;
  createdBy: UserData;
  comments: ObjectId[];
  pinnedComment: ObjectId[];
}
export interface TaskList {
  listId: string;
  uid: string;
  name: string;
  description: string;
  order: number;
  tasks: ObjectId[];
}
export interface Boards {
  boardId: string;
  calendarEvents: ObjectId[];
  notifications: ObjectId[];
  uid: string;
  ownerId: string;
  name: string;
  description: string;
  boardLink: string;
  members: UserData[];
  memberInvitations: UserData[];
  lists: TaskList[];
}

export interface ITasks extends Task, Document {
  // populate default values
  _id?: ObjectId;
}
export interface IBoards extends Boards, Document {
  // populate default values
  _id?: ObjectId;
}
