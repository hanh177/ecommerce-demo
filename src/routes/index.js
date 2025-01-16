"use strict";
const express = require("express");
const { checkApiKey, checkPermission } = require("../auth/checkAuth");
const { asyncHandler } = require("../helpers/asyncHandler");
const router = express.Router();

// check api key
router.use(asyncHandler(checkApiKey));

// check permission
router.use(asyncHandler(checkPermission("0000")));

router.use("/v1/api", require("./access"));
router.use("/v1/api/product", require("./product"));

module.exports = router;
