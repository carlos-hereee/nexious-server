import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { StoreRequest } from "@app/request";
import { MerchBody } from "@app/store";
import { generateStringUrl } from "@utils/app/generateUrl";

export const editMerch = async (req: StoreRequest<MerchBody>, res: Response, next: NextFunction) => {
  try {
    const { name, cost: c, description, hero: h, images, inStock: stock } = req.body;
    // udpate string types
    if (name) {
      req.merch.name = name;
      req.merch.merchLink = generateStringUrl(name);
    }
    if (description) req.merch.description = description;
    // format cost and in stock numbers
    const inStock = parseInt(stock, 10);
    const cost = parseInt(c, 10);
    // TODO: ADD NOTIFICATION IF MORE MERCH IN STOCK
    if (req.merch.inStock !== inStock) req.merch.inStock = inStock;
    if (req.merch.cost !== cost) req.merch.cost = cost;
    // format hero/thumbnail image
    if (req.merch.hasCatalog !== (images === "true")) req.merch.hasCatalog = images === "true";
    if (req.body.catalog) req.merch.catalog = req.body.catalog;
    const hero = req.assets.hero || h;
    if (req.merch.hero !== hero) {
      req.merch.hero = hero;
      req.merch.thumbnail = hero;
    }
    // save merch to db
    await req.merch.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store merch");
  }
};
