import { ITasks } from "@app/tasks";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

const tasksSchema = new Schema<ITasks>(
  {
    uid: { type: String, default: v4 },
    taskId: { type: String, default: v4 },
    name: { type: String },
    description: { type: String },
    dueDate: { type: String },
    dueTime: { type: String },
    assignedTo: { name: { type: String }, avatar: { type: String }, userId: { type: String } },
    createdBy: { name: { type: String }, avatar: { type: String }, userId: { type: String } },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
    pinnedComment: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
  },
  { timestamps: true }
);
const Tasks = mongoose.model("Tasks", tasksSchema);
export default Tasks;
