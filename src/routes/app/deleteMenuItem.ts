import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { AppRequest } from "types/request";

export const deleteMenuItem = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const menuId = req.params.menuId;
    // if match remove menu from app menu
    const menu = req.project.menu.filter((data) => data.uid !== menuId);
    req.project.menu = menu;
    // update db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
