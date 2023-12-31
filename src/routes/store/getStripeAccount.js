const useGenericErrors = require("../../utils/auth/useGenericErrors");
const getAccount = require("../../utils/stripe/accounts/getAccount");

module.exports = async (req, res) => {
  try {
    // console.log("req.params :>> ", req.params);
    const { accountId } = req.params;
    const account = await getAccount({ id: accountId });
    // console.log("account :>> ", account);
    res.status(200).json(account).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get account");
  }
};
