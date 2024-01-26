import mediaList from "@data/app/mediaList.json" assert { type: "json" };

export const generateMediaUrl = (media: string, link: string) => {
  // if(meidamedia)
  return mediaList.links[media] + link || media;
};
