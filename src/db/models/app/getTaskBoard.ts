import { ObjectId } from "@app/db";
import BoardTasks from "@db/schema/boardTasts";
import Tasks from "@db/schema/tasks";

interface TaskBoardParams {
  boardId?: string;
}
interface TaskParams {
  taskId?: string;
  id?: ObjectId;
}
export const getTaskBoard = async ({ boardId }: TaskBoardParams) => {
  if (boardId) return await BoardTasks.findOne({ boardId });
  return null;
};
export const getTaskWithId = async ({ taskId, id }: TaskParams) => {
  if (taskId) return await Tasks.findOne({ taskId });
  if (id) return await Tasks.findOne({ _id: id });
  return null;
};
