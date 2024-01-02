import mediaList from "@dataapp/mediaList.json";

export = (media, link) => {
  // if(meidamedia)
  return mediaList.links[media] + link || media;
};
