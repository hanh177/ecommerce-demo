"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/checkAuth");
const router = express.Router();

//signup
router.post("/shop/signup", asyncHandler(accessController.signUp));

//login
router.post("/shop/login", asyncHandler(accessController.login));

// require middleware to check authentication
router.use(asyncHandler(authentication));

//logout
router.post("/shop/logout", asyncHandler(accessController.logout));

module.exports = router;
