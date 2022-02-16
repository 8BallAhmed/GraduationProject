const model = require("./model");
const joi = require("joi");
const Account = model.Account;
const Patient = model.Patient;
const Doctor = model.Doctor;
const registerSchema = require("./joi-validators").registerSchema;
const express_app = require("./express-app");
const app = express_app.app;

app.post("/register", (req, res) => {
  const body = req.body;
  const errors = registerSchema.validate(body, { abortEarly: false }).error;
  console.log(`errors: ${errors}`);
  if (errors == undefined) {
    Account.create({
      email: body.email,
      password: body.password,
      address: body.address,
      name: body.name,
      SSN: body.ssn,
      gender: body.gender,
      city: body.city,
      dob: null,
      account_type: body.account_type,
    })
      .then(() => {
        res.end(
          JSON.stringify({
            status: 200,
            message: "Account created successfully!",
            account_type: body.account_type,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        res.end(
          JSON.stringify({
            status: 401,
            message: "Could not create account",
            error: err.errors[0].message,
          })
        );
      });
  } else {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Bad request!",
        errors: errors.message,
      })
    );
  }
});
