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
  body.account_type = body.account_type.toLowerCase();
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
        if (body.account_type == "patient") {
          Patient.create({
            fk_email: body.email,
          })
            .then(() => {
              res.end(
                JSON.stringify({
                  status: 200,
                  message: "Patient account created successfully!",
                  account_type: body.account_type,
                })
              );
            })
            .catch((err) => {
              res.end(
                JSON.stringify({
                  status: 401,
                  message: "Could not create Patient account!",
                  error: err.errors[0].message,
                })
              );
            });
        } else if (body.account_type == "doctor") {
          Doctor.create({ fk_email: body.email })
            .then(() => {
              res.end(
                JSON.stringify({
                  status: 200,
                  message: "Doctor account created successfully!",
                  account_type: body.account_type,
                })
              );
            })
            .catch((err) => {
              res.end(
                JSON.stringify({
                  status: 401,
                  message: "Could not create Doctor account!",
                  error: err.errors[0].message,
                })
              );
            });
        } else {
          res.end(
            JSON.stringify({
              status: 400,
              message: "Account type must be either 'Patient' or 'Doctor'!",
            })
          );
        }
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
