require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const { NotFoundError } = require("./core/error.response");

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./dbs/init.mongodb");

// init routes
app.use("/", require("./routes"));

// handle errors
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal server error",
    stack: process.env.NODE_ENV === "dev" ? error.stack : undefined,
  });
});

module.exports = app;
