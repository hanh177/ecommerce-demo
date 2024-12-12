"use strict";

const StatusCode = {
  FORBBIEND: 403,
  CONFLICT: 409,
};

const ReasonStatusCode = {
  FORBBIEND: "Bad request error",
  CONFLICT: "Conflict error",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode[StatusCode.CONFLICT],
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode[StatusCode.BadRequestError],
    statusCode = StatusCode.BadRequestError
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
};
