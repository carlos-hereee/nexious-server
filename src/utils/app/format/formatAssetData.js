const { v4 } = require("uuid");
const { baseUrl } = require("../../../../config.env");

module.exports = (file, data) => {
  const path = file.path.replace(/\/\//gi, "/") || "";
  return {
    ...file,
    heroId: v4(),
    heading: data.heading || "",
    title: data.title || "",
    body: data.body || "",
    label: data.label || "",
    // link: "/app/?appName=" + appName.split(" ").join("+"),
    // TODO: compress image for faster loading
    small: `${baseUrl}/${path}`,
    url: `${baseUrl}/${path}`,
    alt: "Industry brand",
  };
};
