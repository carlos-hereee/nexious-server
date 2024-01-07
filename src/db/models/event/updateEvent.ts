import Events from "@dbSchema/events";
export = async ({ pageId }, payload) => {
  return await Events.updateOne({ pageId }, { $set: payload });
};
