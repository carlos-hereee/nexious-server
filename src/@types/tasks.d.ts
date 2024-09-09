import type { Document } from "mongoose";
import { ObjectId } from "./db";

export type TaskStatus = "incomplete" | "complete";

export interface UserData {
  name: string;
  avatar: string;
  userId: string;
}
export interface Task {
  uid?: string;
  taskId?: string;
  assignedTo?: UserData;
  name: string;
  description: string;
  dueDate: string;
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
  uid: string;
  ownerId: string;
  name: string;
  description: string;
  boardLink: string;
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