import { AppRequest } from "@app/request";
import Events from "@db/schema/events";
import Tasks from "@db/schema/tasks";
import { today12hr } from "@utils/app/format/generateDate";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

interface AppBody {
  name: string;
  description: string;
  dueDate: string;
}
export const createTask = async (req: AppRequest<AppBody>, res: Response) => {
  try {
    const listIdx = req.taskBoard.lists.findIndex((list) => list.listId === req.params.listId);
    if (listIdx < 0 || !req.taskBoard.lists[listIdx]) return res.status(404).json("unable to find list item").end();

    // create task
    const task = await Tasks.create({
      ...req.body,
      createdBy: { name: generateUsername(req.user), avatar: req.user.avatar, userId: req.user.userId },
    });
    // create task cal event
    const event = await Events.create({
      // link task to event
      eventId: task.taskId,
      name: task.name,
      details: task.name,
      date: task.dueDate,
      startTime: today12hr(),
      endTime: task.dueTime,
    });
    // link cal event to taskboard
    req.taskBoard.calendarEvents.push(event._id);
    // link task to list
    req.taskBoard.lists[listIdx]?.tasks.push(task._id);
    // save to db
    await req.taskBoard.save();
    await req.taskBoard.populate("lists.tasks");
    return res.status(201).json(req.taskBoard.lists).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
