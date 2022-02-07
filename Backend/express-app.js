require("dotenv").config({ path: "./.env" }); // Set running DIR
const model = require("./model");
const Patient = model.Patient;
const express = require("express");
const app = express();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

app.get("/getPatients", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
    let patients = Patient.findAll().then((result) => {
      console.log(result);
      res.end(
        JSON.stringify({
          status: 200,
          message: "Query successful",
          patients: result,
        })
      );
    });
  }
});

// Take care of JWT Auth in Middleware
