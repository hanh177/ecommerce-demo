"use strict";

const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class SuccessResponse {
  constructor({
    message = ReasonPhrases.OK,
    statusCode = StatusCodes.OK,
    metadata = {},
  }) {
    this.message = message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    if (Object.keys(headers).length > 0) {
      res.set(headers);
    }
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, metadata = {} }) {
    super({
      message,
      statusCode: StatusCodes.CREATED,
      metadata,
    });
  }
}

module.exports = {
  OK,
  CREATED,
};
