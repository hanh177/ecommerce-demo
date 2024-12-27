"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    const keyToken = await keytokenModel.create({
      user: userId,
      publicKey: publicKey.toString(),
    });
    return keyToken ? keyToken.publicKey : null;
  };
}

module.exports = KeyTokenService;
