require("dotenv").config();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const databaseName = process.env.MONGO_INITDB_DATABASE;
const uri = process.env.MONGO_URI;
const port = process.env.MONGO_PORT;

mongoose.connect(
  `mongodb://${username}:${password}@${uri}:${port}/${databaseName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
