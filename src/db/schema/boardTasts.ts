import { IBoards } from "@app/tasks";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const boardTasksSchema = new Schema<IBoards>(
  {
    uid: { type: String, default: v4 },
    boardId: { type: String },
    ownerId: { type: String },
    description: { type: String },
    boardLink: { type: String },
    lists: {
      type: [
        {
          listId: { type: String, default: v4 },
          uid: { type: String, default: v4 },
          name: { type: String },
          description: { type: String },
          order: { type: String },
          tasks: {
            type: [
              {
                uid: { type: String, default: v4 },
                taskId: { type: String, default: v4 },
                name: { type: String },
                description: { type: String },
                dueDate: { type: String },
                assignedTo: { type: String },
                comments: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
                pinnedComment: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
const BoardTasks = mongoose.model("BoardTasks", boardTasksSchema);
export default BoardTasks;
