import { Express, Response } from "express";

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
