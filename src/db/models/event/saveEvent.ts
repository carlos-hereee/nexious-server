import Events from "@dbSchema/events";
export = async (payload) => {
  // const page = new Events(payload);
  return await Events.create(payload);
};
