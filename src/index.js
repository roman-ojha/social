const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config({ path: "../config.env" });
require("../db/conn");
const PORT = process.env.PORT;
app.use(express.json());
app.use(require("../router/route"));
// using google authentication function
app.use(require("../router/google_OAuth_route"));
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
