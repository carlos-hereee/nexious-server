const getCustomers = require("./getCustomers");

const router = require("express").Router();

router.get("/customers", getCustomers);

module.exports = router;
