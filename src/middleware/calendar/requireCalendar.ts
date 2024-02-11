// import { useGenericErrors } from "@authUtils/useGenericErrors";
// import { getCalendar } from "@dbModels/calendar/getCalendar";
// import { NextFunction, Request, Response } from "express";

// export const requireCalendar = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { appId } = req.params;
//     req.calendar = await getCalendar({ appId });
//     if (req.calendar.length) next();
//   } catch (error) {
//     useGenericErrors(res, error, "Calendar not found ");
//   }
// };
