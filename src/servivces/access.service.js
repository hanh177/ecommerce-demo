"use strict";

const { RoleShop } = require("../constant");
const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
class AccessService {
  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new ConflictRequestError("Error: Email already registerd");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (!newShop) {
      return new BadRequestError("Error: Can't create shop");
    }

    // generate public and private key
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });

    // save public key to key token model
    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: newShop._id,
      publicKey,
    });

    if (!publicKeyString) {
      throw new BadRequestError("Error: Can't create key");
    }

    // create token pair
    const tokens = await createTokenPair(
      { userId: newShop._id, email: newShop.email },
      publicKeyString,
      privateKey
    );

    return {
      shop: getInfoData({ object: newShop, fields: ["_id", "name", "email"] }),
      tokens,
    };
  };
}

module.exports = AccessService;
