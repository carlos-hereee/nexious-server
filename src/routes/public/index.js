const router = require("express").Router();
const sendFile = require("./sendFile");
const listBucket = require("./listBucket");
// const sendSVG = require("./sendSVG");

// load app data
router.get("/:assetId", sendFile);
router.get("/bucket/:appId", listBucket);
// router.get("/svg/:assetId", sendSVG);

module.exports = router;
