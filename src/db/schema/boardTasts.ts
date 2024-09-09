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
