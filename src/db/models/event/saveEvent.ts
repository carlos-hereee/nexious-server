const Events = require("../schema/events");

module.exports = async (payload) => {
  // const page = new Events(payload);
  return await Events.create(payload);
};
