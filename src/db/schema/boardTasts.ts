import { IBoards } from "@app/tasks";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const boardTasksSchema = new Schema<IBoards>(
  {
    uid: { type: String, default: v4 },
    boardId: { type: String },
    ownerId: { type: String },
    name: { type: String },
    description: { type: String },
    boardLink: { type: String },
    calendarEvents: { type: [{ type: Schema.Types.ObjectId, ref: "Events" }], default: [] },
    notifications: { type: [{ type: Schema.Types.ObjectId, ref: "Notification" }], default: [] },
    members: {
      type: [
        {
          name: { type: String, default: "" },
          avatar: { type: String, default: "" },
          role: { type: String, default: "member" },
          invitationStatus: { type: String, default: "accepted" },
          userId: { type: String, default: "" },
        },
      ],
      default: [],
    },
    memberInvitations: {
      type: [
        {
          name: { type: String, default: "" },
          avatar: { type: String, default: "" },
          invitationStatus: { type: String, default: "pending" },
          role: { type: String, default: "member" },
          userId: { type: String, default: "" },
        },
      ],
      default: [],
    },
    lists: {
      type: [
        {
          listId: { type: String, default: v4 },
          uid: { type: String, default: v4 },
          name: { type: String },
          description: { type: String },
          order: { type: String },
          tasks: { type: [{ type: Schema.Types.ObjectId, ref: "Tasks" }], default: [] },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
const BoardTasks = mongoose.model("BoardTasks", boardTasksSchema);
export default BoardTasks;
