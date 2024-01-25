import Hero from "@dbSchema/hero.js";

export const saveHero = async (payload) => {
  return await Hero.create(payload);
};
