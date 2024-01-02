import { v4 }  from "uuid";

module.exports = (appId, languageId, reqBody, heroId) => {
  const { title, name, cta, sections, body } = reqBody;
  return {
    appId,
    languageId,
    pageId: v4(),
    heroId,
    title,
    name,
    body,
    cta: cta ? cta : [{}],
    sections: sections ? sections : [{}],
  };
};
