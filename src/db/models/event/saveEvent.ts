import Events from "@dbSchema/events.js";
export const saveEvent = async (payload) => {
  // const page = new Events(payload);
  return await Events.create(payload);
};
