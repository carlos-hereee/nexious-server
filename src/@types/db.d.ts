import type { Schema } from "mongoose";
import type { Express, NextFunction, Request, Response } from "express";
import type { IUserSchema } from "./user";
import type { IAppSchema } from "./app";
import type { IStoreSchema } from "./store";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;

export interface AppRequest extends Request {
  params: { appId: string; appName: string; username: string };
  user: IUserSchema;
  app: IAppSchema;
  cart: any;
  calendar: any;
  event: any;
  store: IStoreSchema;
  asset: string | null;
}
export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;

export type RouterProps = (req: AppRequest, res: Response) => void;
export type MiddlewareProps = (req: AppRequest, res: Response, next: NextFunction) => void;
