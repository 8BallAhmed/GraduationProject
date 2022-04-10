require("dotenv").config({ path: "./.env" }); // Set running DIR
const model = require("./model");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

module.exports.app = app;

// Take care of JWT Auth in Middleware

require("./auth-api");
require("./resource-api");
