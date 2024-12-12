"use strict";

const { RoleShop } = require("../constant");
const { BadRequestError } = require("../core/error.response");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");

class AccessService {
  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("Error: Email already registerd");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      // create access token + refresh token
    }

    return newShop;
  };
}

module.exports = AccessService;
