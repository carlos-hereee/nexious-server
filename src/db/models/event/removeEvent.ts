const Events = require("../../schema/events");

module.exports = async ({ pageId }) => {
  return await Events.findOneAndDelete({ pageId });
};
