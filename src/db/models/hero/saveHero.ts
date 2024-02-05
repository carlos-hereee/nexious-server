import Hero from "@dbSchema/hero";

export const saveHero = async (payload) => {
  return await Hero.create(payload);
};
