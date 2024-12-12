"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../servivces/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
