//import { NextFunction, Request, Response } from "express";

// import { useGenericErrors }  from "@utils/auth/useGenericErrors";

// export const editMerch= async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (req.store) {
//       const { name, quantity, cost, body, hero: h } = req.body;
//       const merchIdx = req.store.inventory.findIndex(
//         // (item) => item?.uid || "" === req.params.merchId
//         (item) => item || "" === req.params.merchId
//       );

//       const hero = req.asset || h || "";
//       // todo: update inventory in bulk
//       // req.store.inventory[merchIdx].name = name;
//       // req.store.inventory[merchIdx].quantity = quantity;
//       // req.store.inventory[merchIdx].cost = cost;
//       // req.store.inventory[merchIdx].body = body;
//       // req.store.inventory[merchIdx].hero = hero;

//       await req.store.save();

//       next();
//     }
//   } catch (error) {
//     useGenericErrors(res, error, "unable to edit store merch");
//   }
// };
