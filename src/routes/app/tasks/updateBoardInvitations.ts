import { AppRequest } from "@app/request";
import { UserData } from "@app/tasks";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

interface IBody {
  user: UserData;
  status: "accepted" | "declined";
}

export const updateBoardInvitations = async (req: AppRequest<IBody>, res: Response, next: NextFunction) => {
  try {
    // remove dups
    const invitedIds = req.taskBoard.memberInvitations.map((m) => m.userId);
    const invitedMembers = req.taskBoard.memberInvitations.filter((m, index) => !invitedIds.includes(m.userId, index + 1));
    // remove dups
    const memberIds = req.taskBoard.members.map((m) => m.userId);
    const members = req.taskBoard.members.filter((m, index) => !memberIds.includes(m.userId, index + 1));
    // update invations list
    req.taskBoard.memberInvitations = invitedMembers.map((m) => {
      if (m.userId === req.body.user.userId) return { ...m, invitationStatus: req.body.status };
      return m;
    });
    // update invations list
    members.push({ ...req.body.user, invitationStatus: req.body.status, role: "member" });
    req.taskBoard.members = members;
    await req.taskBoard.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
