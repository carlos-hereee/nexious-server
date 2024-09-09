import BoardTasks from "@db/schema/boardTasts";
import Tasks from "@db/schema/tasks";

interface TaskBoardParams {
  boardId?: string;
}
interface TaskParams {
  taskId?: string;
}
export const getTaskBoard = async ({ boardId }: TaskBoardParams) => {
  if (boardId) return await BoardTasks.findOne({ boardId });
  return null;
};
export const getTaskWithId = async ({ taskId }: TaskParams) => {
  if (taskId) return await Tasks.findOne({ taskId });
  return null;
};
