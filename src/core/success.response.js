"use strict";

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  [StatusCode.CREATED]: "Created",
  [StatusCode.OK]: "Success",
};

class SuccessResponse {
  constructor({ message, statusCode = StatusCode.OK, metadata = {} }) {
    this.message = message ?? ReasonStatusCode[StatusCode.OK];
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
      statusCode: StatusCode.CREATED,
      metadata,
    });
  }
}

module.exports = {
  OK,
  CREATED,
};
