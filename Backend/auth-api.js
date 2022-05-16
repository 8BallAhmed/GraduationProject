require("dotenv").config({ path: "../.env" }); // Set running DIR
const model = require("./model");
const Account = model.Account;
const Patient = model.Patient;
const Doctor = model.Doctor;
const registerSchema = require("./joi-validators").registerSchema;
const loginSchema = require("./joi-validators").loginSchema;
const pwdResetSchema = require("./joi-validators").pwdResetSchema;
const express_app = require("./express-app");
require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const { user } = require("pg/lib/defaults");
const JWTSECRET = process.env.SECRET;
console.log(JWTSECRET);
const app = express_app.app;

console.log("Auth API Started");

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
              res.status(200).end(
                JSON.stringify({
                  status: 200,
                  message: "Patient account created successfully!",
                  account_type: body.account_type,
                })
              );
            })
            .catch((err) => {
              res.status(401).end(
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
              res.status(200).end(
                JSON.stringify({
                  status: 200,
                  message: "Doctor account created successfully!",
                  account_type: body.account_type,
                })
              );
            })
            .catch((err) => {
              res.status(401).end(
                JSON.stringify({
                  status: 401,
                  message: "Could not create Doctor account!",
                  error: err.errors[0].message,
                })
              );
            });
        } else {
          res.status(400).end(
            JSON.stringify({
              status: 400,
              message: "Account type must be either 'Patient' or 'Doctor'!",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(401).end(
          JSON.stringify({
            status: 401,
            message: "Could not create account",
            error: err.errors[0].message,
          })
        );
      });
  } else {
    res.status(400).end(
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
    console.log('No Errors were found when logging in.')
    let account = Account.findByPk(body.email).then((result) => {
      if (result == null) {
        console.log('Account to log into was not found.')
        res.status(404).end(
          JSON.stringify({
            status: 404,
            message: "User not found!",
          })
        );
        return;
      } else {
        let data = result.dataValues;
        console.log('Checking password match...')
        if (data.password == body.password) {
          console.log('Passwords match.')
          if (data.account_type == "patient") {
            console.log('Account is of type patient.')
            Patient.findOne({
              where: {
                fk_email: data.email,
              },
            }).then((result) => {
              let patient_id = result.dataValues.patient_id;
              res.status(200).end(
                JSON.stringify({
                  status: 200,
                  message: "Login successful!",
                  token: generateAccessToken({
                    account_type: data.account_type,
                    email: data.email,
                    patient_id: patient_id,
                  }),
                })
              );
              return;
            });
          } else if (data.account_type == "doctor") {
            console.log('Account is of type doctor...')
            Doctor.findOne({
              where: {
                fk_email: data.email,
              },
            }).then((result) => {
              let doctor_id = result.dataValues.doctor_id;
              res.status(200).end(
                JSON.stringify({
                  status: 200,
                  message: "Login successful!",
                  token: generateAccessToken({
                    account_type: data.account_type,
                    email: data.email,
                    doctor_id: doctor_id,
                  }),
                })
              );
              return;
            });
          }else{
            res.end(JSON.stringify({status: 400, message: "Account type is neither Doctor nor patient. This shouldn't happen."}))
            return;
          }
        } else {
          console.log('Incorrect password!')
          res.status(401).end(
            JSON.stringify({ status: 401, message: "Incorrect password!" })
          );
          return;
        }
      }
    });
  } else {
    res.status(400).end(
      JSON.stringify({
        status: 400,
        message: "Bad request!",
        errors: errors.message,
      })
    );
    return;
  }
});

//This endpoint is used to update account information supplied by the user
app.put("/update-account", (req, res) => {
  const body = req.body;
  const errors = registerSchema.validate(body, { abortEarly: false }).error;
  if (errors == undefined) {
    Account.findByPk(body.email).then((result) => {
      if (result == null) {
        res.status(404).end(
          JSON.stringify({
            status: 404,
            message:
              "User not found! An Account update for a non-existent user? this shouldn't be happening.",
          })
        );
        return;
      } else {
        if (result.password == body.password) {
          if (JSON.stringify(req.body) == JSON.stringify(result.dataValues)) {
            res.status(418).end(
              JSON.stringify({
                status: 418,
                message: "Nothing to update, I'm a teapot.",
              })
            );
            return;
          }
          result.set(body);
          result.save().then(() => {
            res.status(200).end(
              JSON.stringify({
                status: 200,
                message: "Account updated successfully",
              })
            );
          });
        } else {
          res.status(403).end(
            JSON.stringify({
              status: 403,
              message:
                "You've failed to authenticate using your previous password. Please contact an admin.",
            })
          );
        }
      }
    });
  } else {
    res.status(400).end(
      JSON.stringify({
        status: 400,
        message: "Bad request!",
        errors: errors.message,
      })
    );
  }
});

app.post("/reset-password", (req, res) => {
  const body = req.body;
  const errors = pwdResetSchema.validate(body, { abortEarly: false }).error;
  if (errors == undefined) {
    Account.findByPk(body.email).then((result) => {
      if (result == null) {
        res.status(404).end(
          JSON.stringify({
            status: 404,
            message:
              "User not found! A Password reset for a non-existent user? this shouldn't be happening.",
          })
        );
        return;
      } else {
        if (body.oldPwd == result.password) {
          result.set({ password: body.newPwd });
          result.save().then(() => {
            res.status(200).end(
              JSON.stringify({
                status: 200,
                message: "password reset successfully",
              })
            );
          });
        } else {
          res.status(403).end(
            JSON.stringify({
              status: 403,
              message:
                "You've failed to authenticate using your previous password. Please contact an admin.",
            })
          );
        }
      }
    });
  } else {
    res.end(
      JSON.status(400).stringify({
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
    return res.status(401).end(
      JSON.stringify({
        status: 401,
        message: "Unauthorized. Token not specified.",
      })
    );
  jwt.verify(token, JWTSECRET, (err, decoded) => {
    // Possible errors: Token expired, signatures is messed with. Try this with a modified token.

    req.decodedToken = decoded;
    Account.count({
      where: {
        email: decoded.email,
      },
    }).then((result) => {
      if (err) {
        res.status(403).json({ status: 403, message: err.message });
      } else if (result == 0) {
        res.status(403).json({
          status: 403,
          message: "No account exists by this email!",
        });
      } else {
        next();
        return;
      }
    });

    return;
    // Pass payload to endpoint using this middleware. This is useful
    //for validating types of accounts. For example: Patient can't do Doctor functionalities.
    next();
  });
}

function generateAccessToken(data) {
  console.log(`JWT ID: ${data.id}`);
  // Generates a JWT Token with a payload. Signs using SECRET in .env file
  return jwt.sign(data, JWTSECRET, { expiresIn: "168h" });
}

module.exports.authenticateToken = authenticateToken;
