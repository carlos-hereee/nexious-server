import Events from "@dbSchema/events";
export = async ({ pageId }) => {
  return await Events.findOneAndDelete({ pageId });
};
