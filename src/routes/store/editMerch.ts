import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { StoreRequest } from "@app/request";
import { MerchBody } from "@app/store";
import { generateStringUrl } from "@utils/app/generateUrl";
import { addNotification } from "@utils/app/addNotification";

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
    if (req.merch.cost !== cost) req.merch.cost = cost;
    // format hero/thumbnail image
    if (req.merch.hasCatalog !== (images === "true")) req.merch.hasCatalog = images === "true";
    if (req.body.catalog) req.merch.catalog = req.body.catalog;
    const hero = req.assets.hero || h;
    if (req.merch.hero !== hero) {
      req.merch.hero = hero;
      req.merch.thumbnail = hero;
    }
    if (req.merch.inStock !== inStock) {
      req.merch.inStock = inStock;
      const n = await addNotification({
        type: "edit-merch",
        message: `${inStock} of ${name} have been added to store inventory`,
        link: `/store/${generateStringUrl(req.store?.storeName || "")}/${req.merch.merchLink}`,
      });
      req.project.notifications.push(n._id);
      await req.project.save();
    }
    // save merch to db
    await req.merch.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store merch");
  }
};
