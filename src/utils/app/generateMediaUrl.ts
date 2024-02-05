import mediaList from "@data/app/mediaList.json" ;

export const generateMediaUrl = (media: string, link: string) => {
  // if(meidamedia)
  return mediaList.links[media] + link || media;
};
