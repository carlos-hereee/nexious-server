import Events from "@dbSchema/events";

export const getEvents = async ({ appId, languageId }) => {
  if (languageId) {
    return await Events.find({ appId, languageId });
  }
  if (appId) {
    return await Events.find({ appId });
  }
};
