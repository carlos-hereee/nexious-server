import type { Express, Response, Request, NextFunction } from "express";

export type ExpressApp = Express;
export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;

export interface GetAppProps {
  appId?: string;
  appName?: string;
  appIds?: string[];
  ownerId?: string;
  all?: boolean;
  locale?: string;
}

export interface GetPagesProps {
  appId?: string;
  languageId?: string;
  pageId?: string;
}

export interface GetCalendarProps {
  appId?: string;
  calendarId?: string;
  adminIds?: string[];
}

export type RouterProps = (req: Request, res: Response) => void;
export type MiddlewareProps = (req: Request, res: Response, next: NextFunction) => void;
