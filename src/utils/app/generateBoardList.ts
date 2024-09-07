export const generateBoardList = () => {
  return [
    { name: "Todo", description: "Task left to complete", order: 1, tasks: [] },
    { name: "In progress", description: "Task in progress", order: 2, tasks: [] },
    { name: "Complete", description: "Task completed", order: 3, tasks: [] },
  ];
};
