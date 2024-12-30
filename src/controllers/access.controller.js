"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../servivces/access.service");

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    const { refreshToken, user, keyStore } = req;
    new SuccessResponse({
      metadata: await AccessService.handleRefreshToken({
        refreshToken,
        user,
        keyStore,
      }),
    }).send(res);
  };
}

module.exports = new AccessController();
