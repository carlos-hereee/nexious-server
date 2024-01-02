const Hero = require("../../schema/hero");

export = async ({ heroId }) => {
  return await Hero.findOneAndDelete({ heroId });
};
