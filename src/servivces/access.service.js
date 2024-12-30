"use strict";

const { RoleShop } = require("../constant");
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../core/error.response");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, createKeyPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { findShopByEmail } = require("./shop.service");

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findShopByEmail(email);

    if (!foundShop) {
      throw new NotFoundError("Error: Shop not found");
    }

    const isMatch = await bcrypt.compare(password, foundShop.password);
    if (!isMatch) {
      throw new UnauthorizedError("Error: Password is incorrect");
    }

    const { privateKey, publicKey } = createKeyPair();
    const { _id: userId } = foundShop;

    const tokens = await createTokenPair(
      { userId, email: foundShop.email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getInfoData(foundShop, ["_id", "name", "email"]),
      tokens,
    };
  };

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

    // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    //   modulusLength: 4096,
    //   publicKeyEncoding: {
    //     type: "pkcs1",
    //     format: "pem",
    //   },
    //   privateKeyEncoding: {
    //     type: "pkcs1",
    //     format: "pem",
    //   },
    // });

    const { privateKey, publicKey } = createKeyPair();

    // save public key to key token model
    const keyStore = await KeyTokenService.createKeyToken({
      userId: newShop._id,
      publicKey,
      privateKey,
    });

    if (!keyStore) {
      throw new BadRequestError("Error: Can't create key");
    }

    // create token pair
    const tokens = await createTokenPair(
      { userId: newShop._id, email: newShop.email },
      publicKey,
      privateKey
    );

    return {
      shop: getInfoData(newShop, ["_id", "name", "email"]),
      tokens,
    };
  };
}

module.exports = AccessService;
