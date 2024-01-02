const constructEvent = require("./constructEvent");

module.exports = async (req, res, next) => {
  try {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    req.event = constructEvent({ sig, payload });
    next();
  } catch (err) {
    // console.log("err :>> ", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
