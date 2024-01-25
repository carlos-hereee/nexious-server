import Events from "@dbSchema/events.js";

export const removeEvent = async ({ pageId }) => {
  return await Events.findOneAndDelete({ pageId });
};
