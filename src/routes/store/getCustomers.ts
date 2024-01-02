const useGenericErrors = require("../../utils/auth/useGenericErrors");
const listCustomers = require("../../utils/stripe/customers/listCustomers");

module.exports = async (req, res, next) => {
  try {
    const customers = await listCustomers();
    console.log("customers :>> ", customers);
  } catch (error) {
    useGenericErrors(res, error, "unable to list customers");
  }
};
