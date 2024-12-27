"use strict";

const apikeyModel = require("../models/apikey.model");

const findOneApiKey = async (key) => {
  const objKey = await apikeyModel.findOne({ key, status: true }).lean();
  return objKey;
};

module.exports = { findOneApiKey };
