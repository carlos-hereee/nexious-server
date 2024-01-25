import Hero from "@dbSchema/hero.js";

export const getHero = async ({ heroId, filename }) => {
  if (filename) {
    return await Hero.findOne({ filename });
  }
  if (heroId) {
    return await Hero.findOne({ heroId });
  }
};
