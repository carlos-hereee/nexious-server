import generateHash from "@authUtils/generateHash";
import random from "@authUtils/random";

export = (payload) => {
  const salt = random();
  return generateHash(salt, payload);
};
