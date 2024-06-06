import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { StoreRequest } from "@app/request";
import { MerchBody } from "@app/store";

export const editMerch = async (req: StoreRequest<MerchBody>, res: Response, next: NextFunction) => {
  try {
    const { name, cost: c, description, hero: h, images, inStock: stock } = req.body;
    // udpate string types
    if (req.merch.name !== name) req.merch.name = name;
    if (req.merch.description !== description) req.merch.description = description;
    // format hero/thumbnail image
    const hero = req.assets.hero || h;
    if (req.merch.hero !== hero) {
      req.merch.hero = hero;
      req.merch.thumbnail = hero;
    }
    if (req.merch.hasCatalog !== (images === "true")) req.merch.hasCatalog = images === "true";
    if (req.body.catalog) req.merch.catalog = req.body.catalog;
    // format cost and in stock numbers
    const inStock = parseInt(stock, 10);
    const cost = parseInt(c, 10);
    if (req.merch.inStock !== inStock) req.merch.inStock = inStock;
    if (req.merch.cost !== cost) req.merch.cost = cost;
    // save merch to db
    await req.merch.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store merch");
  }
};
