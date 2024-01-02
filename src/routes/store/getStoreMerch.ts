import getMerch from "@dbModels/merch/getMerch";
import useGenericErrors from "../../utils/auth/useGenericErrors";

export = (req, res) => {
  try {
    const { storeId } = req.params;

    const merch = await getMerch({ storeId });
    // console.log("merch :>> ", merch);
    res.status(200).json(merch).end();
    // next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get store inventory");
  }
};
