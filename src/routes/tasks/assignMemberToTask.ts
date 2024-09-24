import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import Events from "@db/schema/events";
import Users from "@db/schema/users";
import { addNotification } from "@utils/app/addNotification";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const assignMemberToTask = async (req: AppRequest<{ status: string }>, res: Response, next: NextFunction) => {
  try {
    // find task
    const task = await getTaskWithId({ taskId: req.params.taskId });
    if (!task) return res.status(404).end();
    // find member
    const member = req.taskBoard.members.filter((m) => m.userId === req.params.userId)[0];
    if (!member) return res.status(404).end();

    // find cal event
    const event = await Events.findOne({ eventId: task.taskId });
    // notify user
    const notification = await addNotification({
      type: "calendarChanges",
      user: null,
      message: `${member.name} ${req.body.status === "assign" ? "assigned to a" : "removed from"} task ${task.name}`,
    });
    // remove from task
    if (req.body.status === "remove") {
      task.assignedTo = task.assignedTo?.filter((m) => m.userId !== req.params.userId);
      // remove event from user
      await Users.updateOne(
        { userId: member.userId },
        { $pull: { calendarEvents: event?._id }, $addToSet: { notifications: notification._id } }
      );
    }
    // add to task
    if (req.body.status === "assign" && event) {
      // link event to user
      await Users.updateOne(
        { userId: member.userId },
        { $addToSet: { calendarEvents: event._id, notifications: notification._id } }
      );
      // link to taskboard notifications
      req.taskBoard.notifications.push(notification._id);
      // link assigned member
      task.assignedTo?.push(member);
    }
    await task.save();
    await req.taskBoard.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
