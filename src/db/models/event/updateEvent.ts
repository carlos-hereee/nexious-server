const Events = require("../../schema/events");

module.exports = async ({ pageId }, payload) => {
  return await Events.updateOne({ pageId }, { $set: payload });
};
