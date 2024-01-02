const Events = require("../../schema/events");

export = async ({ appId, languageId }) => {
  if (languageId) {
    return await Events.find({ appId, languageId });
  }
  if (appId) {
    return await Events.find({ appId });
  }
};
