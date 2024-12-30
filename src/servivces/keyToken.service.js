"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    // const keyToken = await keytokenModel.create({
    //   user: userId,
    //   publicKey,
    //   privateKey,
    // });
    // return keyToken;

    const filter = { user: userId },
      update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      },
      options = { new: true, upsert: true };

    const tokens = await keytokenModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    return tokens ? tokens.publicKey : null;
  };
}

module.exports = KeyTokenService;
