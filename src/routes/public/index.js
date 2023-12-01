const router = require("express").Router();
const sendFile = require("./sendFile");
const listAllBuckets = require("./listAllBuckets");
const listBucket = require("./listBucket");
// const sendSVG = require("./sendSVG");

// load app data
router.get("/:assetId", sendFile);
router.get("/bucket", listAllBuckets);
router.get("/bucket/:bucketName", listBucket);
// router.get("/svg/:assetId", sendSVG);

module.exports = router;
