"use strict";

const { default: mongoose } = require("mongoose");
const { countConnect } = require("../helpers/check.connect");

const { db: config } = require("../configs/config.mongodb");
const connectString = `mongodb://${config.host}:${config.port}/${config.name}`;
// singleton pattern
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Connected MongoDB");
        countConnect();
      })
      .catch((err) => console.error("Error connecting MongoDB::: ", err));

    let env = "dev";
    if (env === "dev") {
      // print mongo queries
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
