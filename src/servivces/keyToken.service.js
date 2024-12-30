"use strict";

const keytokenModel = require("../models/keytoken.model");
const { toMongoObjectId } = require("../utils");

class KeyTokenService {
  static create = async ({ userId, publicKey, privateKey, refreshToken }) => {
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

  static findByUserId = async (userId) => {
    return await keytokenModel.findOne({ user: toMongoObjectId(userId) });
  };

  static removeById = async (id) =>
    await keytokenModel.findByIdAndDelete({ _id: id });

  static findnByRefreshTokenUsed = async (refreshToken) =>
    await keytokenModel
      .findOne({
        refreshTokensUsed: refreshToken,
      })
      .lean();

  static removeByUserId = async (userId) =>
    await keytokenModel.findOneAndDelete({ user: userId });

  static findnByRefreshToken = async (refreshToken) =>
    await keytokenModel.findOne({ refreshToken });
}

module.exports = KeyTokenService;
