import generateHash  from "../../utils/auth/generateHash";
import random  from "../../utils/auth/random";

export  (payload) => {
  const salt = random();
  return generateHash(salt, payload);
};
