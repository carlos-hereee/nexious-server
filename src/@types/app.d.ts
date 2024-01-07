import type { Express, Response, Request, NextFunction } from "express";
import type { IAppSchema, ICta, IMediaItem, IPage, ISection, IUserSchema } from "./db";

export interface AppRequest extends Request {
  user: IUserSchema;
  app: IAppSchema;
  asset: string | null;
}
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

export type RouterProps = (req: AppRequest, res: Response) => void;
export type MiddlewareProps = (req: AppRequest, res: Response, next: NextFunction) => void;

export type RefsProps = {
  hasMedias?: IMediaItem[];
  hasCta?: ICta[];
  hasSections?: ISection[];
};
export interface PageDataProps extends IPage {
  subtitle: string;
  hasMedias: boolean;
  hero?: string;
  cta?: ICta;
  sections?: ISection;
}
