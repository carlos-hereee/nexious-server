const Events = require("../../schema/events");

export = async ({ pageId }, payload) => {
  return await Events.updateOne({ pageId }, { $set: payload });
};
