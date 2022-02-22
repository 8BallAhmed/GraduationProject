const model = require("./model");
const Account = model.Account;
const Patient = model.Patient;
const Doctor = model.Doctor;
const registerSchema = require("./joi-validators").registerSchema;
const loginSchema = require("./joi-validators").loginSchema;
const express_app = require("./express-app");
require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.SECRET;
console.log(JWTSECRET);
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

app.post("/login", (req, res) => {
  const body = req.body;
  const errors = loginSchema.validate(body, { abortEarly: false }).error;
  if (errors == undefined) {
    let account = Account.findByPk(body.email).then((result) => {
      if (result == null) {
        res.end(
          JSON.stringify({
            status: 404,
            message: "User not found!",
          })
        );
      } else {
        let data = result.dataValues;
        if (data.password == body.password) {
          res.end(
            JSON.stringify({
              status: 200,
              message: "Login successful!",
              token: generateAccessToken({ account_type: data.account_type }),
            })
          );
        } else {
          res.end(
            JSON.stringify({ status: 401, message: "Incorrect password!" })
          );
        }
      }
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

function authenticateToken(req, res, next) {
  // Used to validate tokens, to be used as middleware. Attach to endpoint.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Splits token, which is usually in the form of : "Bearer <token>"
  if (token == null)
    // Incase a token wasn't specified
    return res.end(
      JSON.stringify({
        status: 401,
        message: "Unauthorized. Token not specified.",
      })
    );
  jwt.verify(token, JWTSECRET, (err, decoded) => {
    if (err)
      // Possible errors: Token expired, signatures is messed with. Try this with a modified token.
      return res.end(JSON.stringify({ status: 403, message: err.message }));
    req.decodedToken = decoded; // Pass payload to endpoint using this middleware. This is useful
    //for validating types of accounts. For example: Patient can't do Doctor functionalities.
    next();
  });
}

function generateAccessToken(data) {
  // Generates a JWT Token with a payload. Signs using SECRET in .env file
  return jwt.sign(data, JWTSECRET, { expiresIn: "30s" });
}

module.exports.authenticateToken = authenticateToken;
