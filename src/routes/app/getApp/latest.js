const msg = require("../../../db/data/error.message.json");
const getApp = require("../../../db/models/app/getApp");
const getPages = require("../../../db/models/page/getPages");

module.exports = async (req, res) => {
  const appId = req.params.appId;
  const app = await getApp({ appId });
  if (!app) return res.status(404).json(msg.appNotFound).end();
  const pages = await getPages({ appId });
  return res.status(201).json({ app, pages }).end();
};
