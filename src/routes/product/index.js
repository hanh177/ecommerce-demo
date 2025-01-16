"use strict";
const express = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/checkAuth");
const router = express.Router();

// require middleware to check authentication
router.use(asyncHandler(authentication));
router.post("", asyncHandler(productController.createProduct));

module.exports = router;
