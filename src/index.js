const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config({ path: "../config.env" });
app.use(express.json());
const PORT = process.env.PORT;

// Database connection
require("../db/userDataConnection");
require("../db/userStorageConnection");

// Connection router
app.use(require("../router/route"));
app.use(require("../router/storageRoute"));

// using google authentication function
app.use(require("../router/google_OAuth_route"));

// listening to a 'PORT'
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
