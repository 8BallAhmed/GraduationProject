const express_app = require("./express-app");
const model = require("./model");
const Patient = model.Patient;
const app = express_app.app;

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
