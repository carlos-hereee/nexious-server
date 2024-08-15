import { GridData, MapDimensions } from "@app/app";
import { AppRequest } from "@app/request";
import Maps from "@db/schema/maps";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

interface Body {
  map: GridData[][];
  dimensions: MapDimensions;
}
export const buildMap = async (req: AppRequest<Body>, res: Response, next: NextFunction) => {
  try {
    // create map
    const map = await Maps.create(req.body);
    // link map to project
    req.project.maps.push(map._id);
    // save to db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to build app map");
  }
};
