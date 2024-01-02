const Hero = require("../../schema/hero");

export = async (payload) => {
  const hero = await Hero.create(payload);
  return hero._id;
};
