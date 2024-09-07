import BoardTasks from "@db/schema/boardTasts";

interface TaskBoardParams {
  boardId?: string;
}
export const getTaskBoard = async ({ boardId }: TaskBoardParams) => {
  if (boardId) return await BoardTasks.findOne({ boardId });
  return null;
};
