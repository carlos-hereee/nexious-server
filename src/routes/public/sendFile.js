const path = require("path");

module.exports = (req, res) => {
  const filePath = path.resolve() + `/public/${req.params.assetId}`;
  // set propper content type else drowser will download file
  res.setHeader("Content-Type", "image/svg+xml");
  res.sendFile(filePath);
};
