import type { RouterProps } from "@app/db";

export const fetchCalendar: RouterProps = (req, res) => {
  res.status(202).json(req.calendar);
};
