const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const DB = process.env.USERSTORAGEDATABASE;

const stgConn = mongoose.createConnection(DB);

module.exports = stgConn;
