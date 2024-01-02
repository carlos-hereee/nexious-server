const { baseUrl } = require("../../../../config.env");

module.exports = (file, data) => {
  if (!file) return;
  const path = file?.path?.replace(/\/\//gi, "/") || "";
  return {
    ...file,
    image: { data: file.filename, contentType: file.mimetype },
    heroId: data?.heroId,
    sharedKey: data?.sharedKey,
    heading: data?.heading || "",
    title: data?.title || "",
    body: data?.body || "",
    label: data?.label || "",
    // link: "/app/?appName=" + appName.split(" ").join("+"),
    // TODO: compress image for faster loading
    small: `${baseUrl}/${path}`,
    url: `${baseUrl}/${path}`,
    hero: `${baseUrl}/${path}`,
    alt: "Industry brand",
  };
};
