const { baseUrl } = require("../../../../config.env");

module.exports = (appName, file) => {
  const path = file.path.replace(/\/\//gi, "/") || "";
  return {
    ...file,
    heading: appName,
    title: appName,
    link: "/app/?appName=" + appName.split(" ").join("+"),
    // TODO: compress image for faster loading
    small: `${baseUrl}/${path}`,
    url: `${baseUrl}/${path}`,
    alt: "Industry brand",
  };
};
