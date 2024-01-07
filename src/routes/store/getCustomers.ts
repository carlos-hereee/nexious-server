import { useGenericErrors } from "../../utils/auth/useGenericErrors";
import listCustomers from "@stripe/customers/listCustomers";

export const getCustomers = (req, res, next) => {
  try {
    const customers = await listCustomers();
    console.log("customers :>> ", customers);
  } catch (error) {
    useGenericErrors(res, error, "unable to list customers");
  }
};
