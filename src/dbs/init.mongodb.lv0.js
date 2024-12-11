"use strict";

const { default: mongoose } = require("mongoose");

const connectString = `mongodb://localhost:27017/ecommerce`;
mongoose
  .connect(connectString, { maxPoolSize: 50 })
  .then((_) => console.log("Connected MongoDB"))
  .catch((err) => console.error("Error connecting MongoDB::: ", err));

let env = "";
if (env === "dev") {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
