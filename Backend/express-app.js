require("dotenv").config({ path: "./.env" }); // Set running DIR
const model = require("./model");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json()) // middleware function to limit the body to json format only

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

module.exports.app = app;
// Take care of JWT Auth in Middleware