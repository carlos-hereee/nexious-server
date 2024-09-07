import type { Date, Document } from "mongoose";
import { ObjectId } from "./db";

export type TaskStatus = "incomplete" | "complete";

export interface Task {
  uid: string;
  taskId: string;
  name: string;
  description: string;
  dueDate: Date;
  assignedTo: string;
  comments: ObjectId[];
  pinnedComment: ObjectId[];
}
export interface TaskList {
  listId: string;
  uid: string;
  name: string;
  description: string;
  order: number;
  tasks: Task[];
  // status: TaskStatus;
}
export interface Boards {
  boardId: string;
  uid: string;
  ownerId: string;
  name: string;
  description: string;
  link: string;
  lists: TaskList[];
}

export interface IBoards extends Boards, Document {
  // populate default values
  _id?: ObjectId;
}
