import useGenericErrors from "../../utils/auth/useGenericErrors";
import message from "@data/error.message.json";

export = (req, res, next) => {
  try {
    req.store ? next() : res.status(404).json(message.storeNotFound);
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
