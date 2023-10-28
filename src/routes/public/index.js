const router = require("express").Router();
const sendFile = require("./sendFile");
// const sendSVG = require("./sendSVG");

// load app data
router.get("/:assetId", sendFile);
// router.get("/svg/:assetId", sendSVG);

module.exports = router;
