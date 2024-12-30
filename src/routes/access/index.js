"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../core/async.catch");
const router = express.Router();

//signup
router.post("/shop/signup", asyncHandler(accessController.signUp));

//login
router.post("/shop/login", asyncHandler(accessController.login));
module.exports = router;
