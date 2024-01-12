import type { NextFunction, Request, Response } from "express";
import type { AuthRequest, MiddlewareRequest, PageRequest, StripeRequest, UserRequest } from "./db";
import type { MerchRequest, StoreRequest } from "./stripe";
import type {
  AppDataRequest,
  AppRequest,
  AppIdRequest,
  InitAppRequest,
  UpdateAppRequest,
} from "./app";

// custom middleware error handling
export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;
// generic express props
export type RouterProps = (req: Request, res: Response) => void;
// min app data response
export type MinAppDataRequest = (req: AppDataRequest, res: Response) => void;
// generic express with only appName as param
export type AppNameParams = (req: Request<{ appName: string }>, res: Response) => void;
// initial middleware props
export type MiddlewareProps = (req: MiddlewareRequest, res: Response, next: NextFunction) => void;
// after successful user middleware
export type UserRequestware = (req: UserRequest, res: Response, next: NextFunction) => void;
export type AuthRequestware = (req: AuthRequest, res: Response, next: NextFunction) => void;
// after successful stripe middleware
export type StripeRequestware = (req: StripeRequest, res: Response, next: NextFunction) => void;
// create new app request
export type InitAppRequestware = (req: InitAppRequest, res: Response, next: NextFunction) => void;

// after successful app middleware
export type AppRequestware = (req: AppRequest, res: Response, next: NextFunction) => void;
export type AppIdRequestware = (req: AppIdRequest, res: Response, next: NextFunction) => void;
export type UpdateAppRequestware = (
  req: UpdateAppRequest,
  res: Response,
  next: NextFunction
) => void;
// export type
export type PageRequestware = (req: PageRequest, res: Response, next: NextFunction) => void;
export type StoreRequestWare = (req: StoreRequest, res: Response, next: NextFunction) => void;
export type MerchRequestWare = (req: MerchRequest, res: Response, next: NextFunction) => void;
