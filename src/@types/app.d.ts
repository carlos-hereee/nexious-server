declare module "app-types" {
  import { Express, Response } from "express";

  export type ExpressApp = Express;
  export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;
}
