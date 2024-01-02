import mediaList  from "../../db/data/app/mediaList.json";

module.exports = (media, link) => {
  // if(meidamedia)
  return mediaList.links[media] + link || media;
};
