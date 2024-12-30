"use strict";

const { HEADER } = require("../constant");
const {
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
} = require("../core/error.response");
const { findOneApiKey } = require("../servivces/apikey.service");
const jwt = require("jsonwebtoken");
const KeyTokenService = require("../servivces/keyToken.service");

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

const authentication = async (req, res, next) => {
  /*
    - check user id missing
    - get access token
    - verify token
    - check user in db
    - check key store with this user
    - return next()
  */

  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new UnauthorizedError("Invalid request");

  const keyStore = await KeyTokenService.findKeyTokenByUserId(userId);
  if (!keyStore) throw new NotFoundError("Key store not found");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new UnauthorizedError("Invalid request");

  try {
    const decodeData = jwt.decode(accessToken, keyStore.publicKey);
    if (userId !== decodeData.userId)
      throw new UnauthorizedError("Invalid user id");

    req.keyStore = keyStore;
  } catch (e) {
    throw e;
  }

  return next();
};

module.exports = { checkApiKey, checkPermission, authentication };
