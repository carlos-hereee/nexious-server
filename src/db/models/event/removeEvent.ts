const Events = require("../../schema/events");

export = async ({ pageId }) => {
  return await Events.findOneAndDelete({ pageId });
};
