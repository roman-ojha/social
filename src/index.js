const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
require("../db/conn");
const PORT = process.env.PORT;
app.use(express.json());
app.use(require("../router/route"));
const middleware = (req, res, next) => {
  next();
};
app.get("/", middleware, (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
