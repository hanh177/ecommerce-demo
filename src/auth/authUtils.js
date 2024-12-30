"use strict";

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createKeyPair = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");

  return { privateKey, publicKey };
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (e) {
    console.log(e);
    return error.message;
  }
};

const verifyJWT = async (token, keySecret) => {
  return jwt.verify(token, keySecret);
};

module.exports = { createKeyPair, createTokenPair, verifyJWT };
