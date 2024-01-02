import useGenericErrors  from "../../utils/auth/useGenericErrors";
import listCustomers  from "../../utils/stripe/customers/listCustomers";

module.exports = async (req, res, next) => {
  try {
    const customers = await listCustomers();
    console.log("customers :>> ", customers);
  } catch (error) {
    useGenericErrors(res, error, "unable to list customers");
  }
};
