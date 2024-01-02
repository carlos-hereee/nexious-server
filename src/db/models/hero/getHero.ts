const Hero = require("../../schema/hero");

export = async ({ heroId, filename }) => {
  if (filename) {
    return await Hero.findOne({ filename });
  }
  if (heroId) {
    return await Hero.findOne({ heroId });
  }
};
