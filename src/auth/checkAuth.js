"use strict";

const { HEADER } = require("../constant");
const { ForbiddenError } = require("../core/error.response");
const { findOneApiKey } = require("../servivces/apikey.service");

const checkApiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]?.toString();

  if (!key) {
    throw new ForbiddenError();
  }

  const objKey = await findOneApiKey(key);
  if (!objKey) {
    throw new ForbiddenError();
  }

  req.objKey = objKey;

  return next();
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (
      !req.objKey.status ||
      !req.objKey.permissions ||
      !req.objKey.permissions.includes(permission)
    ) {
      throw new ForbiddenError("Permission denied");
    }

    return next();
  };
};

module.exports = { checkApiKey, checkPermission };
