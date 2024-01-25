import Hero from "@dbSchema/hero.js";

export const removeHero = async ({ heroId }) => {
  return await Hero.findOneAndDelete({ heroId });
};
