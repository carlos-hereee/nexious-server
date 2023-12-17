const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { name, body, quantity, cost, hero: h } = req.body;
    const hero = req.asset || h || "";
    req.store.inventory.push({ name, hero, body, quantity, cost });
    await req.store.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add store");
  }
};
