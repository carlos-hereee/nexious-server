import type { Schema } from "mongoose";
import type { Express, NextFunction, Request, Response } from "express";
import type { IUserSchema } from "./user";
import type { IAppSchema } from "./app";
import type { IStoreSchema } from "./store";
import type { IFile } from "./assets";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;

export interface AppRequest {
  params: { appId: string; appName: string; username: string; pageId: string; assetId: string };
  user: IUserSchema;
  app: IAppSchema;
  cart: any;
  calendar: any;
  event: any;
  store: IStoreSchema;
  asset: string | null;
  assets: { hero: string; sectionHero: string[] } | null;
  files: { hero: IFile; sectionHero: IFile[] };
  file: IFile;
}
export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;

export type RouterProps = (req: Request<AppRequest>, res: Response) => void;
export type MiddlewareProps = (req: Request<AppRequest>, res: Response, next: NextFunction) => void;
