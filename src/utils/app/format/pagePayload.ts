export const pagePayload = (appId, languageId, reqBody, heroId) => {
  const { title, name, cta, sections, body } = reqBody;
  return {
    appId,
    languageId,
    heroId,
    title,
    name,
    body,
    cta: cta || [],
    sections: sections || [],
  };
};
