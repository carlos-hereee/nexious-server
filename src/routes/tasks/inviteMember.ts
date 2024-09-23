import { AppRequest } from "@app/request";
import { addNotification } from "@utils/app/addNotification";
import { clientUrl } from "@utils/app/config";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const inviteMember = async (req: AppRequest, res: Response) => {
  try {
    // user data
    const { avatar, userId } = req.user;
    const name = generateUsername(req.user);
    // add user to invitations
    req.taskBoard.memberInvitations.push({ avatar, userId, name, invitationStatus: "pending", role: "" });

    if (req.project) {
      const notification = await addNotification({
        type: "appChanges",
        user: null,
        message: name + " request to join " + req.taskBoard.name + " taskboard",
      });
      req.project.notifications.push(notification._id);
      await req.project.save();
    }
    // save to db
    await req.taskBoard.save();
    return res.status(200).redirect(clientUrl + "/invite/success");
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
