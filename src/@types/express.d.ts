import type { NextFunction, Request, Response } from "express";
import type {
  AppRequest,
  InitAppRequest,
  MiddlewareRequest,
  PageRequest,
  StripeRequest,
  UserRequest,
} from "./db";

// custom middleware error handling
export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;
// generic express props
export type RouterProps = (req: Request, res: Response) => void;
// initial middleware props
export type MiddlewareProps = (req: MiddlewareRequest, res: Response, next: NextFunction) => void;
// after successful user middleware
export type UserRequestware = (req: UserRequest, res: Response, next: NextFunction) => void;
// after successful stripe middleware
export type StripeRequestware = (req: StripeRequest, res: Response, next: NextFunction) => void;
// create new app request
export type InitAppRequestware = (req: InitAppRequest, res: Response, next: NextFunction) => void;

// after successful app middleware
export type AppRequestware = (req: AppRequest, res: Response, next: NextFunction) => void;
export type PageRequestware = (req: PageRequest, res: Response, next: NextFunction) => void;
