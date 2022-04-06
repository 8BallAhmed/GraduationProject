require("dotenv").config({ path: "./.env" });
const e = require("express");
let { authenticateToken } = require("./auth-api");
const express_app = require("./express-app");
const model = require("./model");
const Patient = model.Patient;
const Doctor = model.Doctor;
const Activitie = model.Activity;
const Appointment = model.Appointment;
const GlucoseTest = model.GlucoseTest;
const Account = model.Account;
const Supervision = model.Supervision;
const glucoseSchema = require("./joi-validators").glucoseSchema;
const app = express_app.app;

if (process.env.NODE_ENV != "development") {
  // If we're in development, it doesn't use JWT Authentication as Middleware
  authenticateToken = require("./auth-api").authenticateToken;
  console.log(`Started Resource API WITHOUT JWT Middleware`);
} else {
  // If we're in Testing or Production, it uses JWT Authentication as Middleware
  authenticateToken = require("./auth-api").authenticateToken;
  console.log("Started Resource API WITH JWT Middleware");
}

//this endpoint should fetch patient_id and email FK from account table to get personal information such as name, age etc...
//since there is no fk_email ill stick with patient_id as it is for testing purposes
app.get("/patients", authenticateToken, (req, res) => {
  // Middleware function "authenticateToken" is passed to endpoint
  let accountType = req.decodedToken.account_type;
  let email = req.decodedToken.email;
  let supervisedPatients = [];
  let patientIDs = [];
  if (accountType != "doctor" && accountType != null) {
    res.end(
      JSON.stringify({
        status: 403,
        message: "Unauthorized access. Account must be of type: Doctor.",
      })
    );
    return; // Must add return, or second hit on endpoint will look infinitely
  }
  Doctor.findOne({ where: { fk_email: email } }).then((result) => {
    if (result == null) {
      res.end(
        JSON.stringify({
          status: 404,
          message: "Doctor for patients not found.",
        })
      );
      return;
    } else {
      let doctor_id = result.dataValues.doctor_id;
      Supervision.findAll({
        where: {
          fk_doctor_id: doctor_id,
        },
      }).then((result) => {
        if (result == null) {
          res.end(
            JSON.stringify({
              status: 404,
              message: "This Doctor does not treat any patients currently.",
            })
          );
          return;
        } else {
          result.map((supervised_patient) => {
            patientIDs.push(supervised_patient.dataValues.fk_patient_id);
          });
          patientIDs.map((ID) => {
            Patient.findByPk(ID).then((result) => {
              if (result == undefined) {
                res.end(
                  JSON.stringify({
                    status: 500,
                    message:
                      "This Patient does not exist anymore, please contact an administrator or file a bug report",
                  })
                );
                return;
              } else {
                Account.findByPk(result.dataValues.fk_email)
                  .then((accountResult) => {
                    if (accountResult == undefined) {
                      res.end(
                        JSON.stringify({
                          status: 500,
                          message:
                            "An account for this patient was not found. Please contact an administrator or file a bug report.",
                        })
                      );
                    } else {
                      supervisedPatients.push({
                        name: accountResult.dataValues.name,
                        ...result.dataValues,
                      });
                    }
                  })
                  .then(() => {
                    res.end(
                      JSON.stringify({
                        status: 200,
                        patients: supervisedPatients,
                      })
                    );
                    return;
                  });
              }
            });
          });
        }
      });
    }
  });
});

// an endpoint to look after a patient by his id
app.get("/patients/:patientId", authenticateToken, (req, res) => {
  // Middleware function "authenticateToken" is passed to endpoint
  let accountType = req.decodedToken.account_type;
  if (accountType != "doctor" && accountType != null) {
    res.end(
      JSON.stringify({
        status: 403,
        message: "Unauthorized access. Account must be of type: Doctor.",
      })
    );
    return;
  }
  let PatientId = req.params.patientId;
  Patient.findByPk(PatientId).then((result) => {
    console.log(result);
    res.json({
      status: 200,
      message: "Query successful",
      patient: result,
    });
  });
});

app.get("/doctors", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
    Doctor.findAll().then((result) => {
      console.log(result);
      res.json({
        status: 200,
        message: "Query Successed",
        doctors: result,
      });
    });
  }
});

app.get("/doctors/:doctorID", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
    let DoctorID = req.params.doctorID;
    Doctor.findByPk(DoctorID).then((result) => {
      res.json({
        status: 200,
        message: "Query Succeed",
        doctor: result,
      });
    });
  }
});

// an endpoint to get all activites by the patient id
app.get("/activity/:patient_id", authenticateToken, (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified",
      })
    );
  } else {
    let PatientId = req.body.patient_id;
    Activitie.findByPk(PatientId).then((result) => {
      res.json({
        status: 200,
        message: "success",
        activities: result,
      });
    });
  }
});

// this endpoint will list all available appointments to doctors
app.get("/appointment", authenticateToken, (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        "status": 400,
        "message": "Authentication Header not specified",
      })
    );
  } else {
    Appointment.findAll().then((result) => {
      res.json({
        status: 200,
        message: "success",
        appoitments: result,
      });
    });
  }
});

// Glucose CRUD

app.post("/glucose", authenticateToken, (req, res) => {
  // Add glucose reading
  const body = req.body;
  const errors = glucoseSchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  let email = req.decodedToken.email;
  if (account_type != "patient") {
    res.end(
      JSON.stringify({
        status: 403,
        message: "Incorrect account type, only patient allowed.",
      })
    );
    return;
  }
  if (errors == undefined) {
    let account = Patient.findOne({ fk_email: email }).then((result) => {
      if (result == null) {
        res.end(
          JSON.stringify({
            status: 404,
            message: "User not found! Blood Glucose not added.",
          })
        );
      } else {
        let patient_id = result.dataValues.patient_id;
        console.log(`RESULT PATIENT ID: ${result.dataValues.patient_id}`);
        GlucoseTest.create({ ...body, patient_id: patient_id })
          .then(() => {
            res.end(
              JSON.stringify({ status: 200, message: "Glucose reading added." })
            );
          })
          .catch((err) => {
            res.end(
              JSON.stringify({
                status: 401,
                message: "Could not create Glucose Reading!",
                error: err.errors[0].message,
              })
            );
          });
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

// For pagination, limit of 5 for each page.
// This endpoint returns all glucose tests for the patient
app.get(
  "/glucose/patient/:patient_id/page/:page",
  authenticateToken,
  (req, res) => {
    const patient_id = req.params.patient_id;
    const page = req.params.page;
    GlucoseTest.findAll({
      where: {
        patient_id: patient_id,
      },
    })
      .then((result) => {
        res.end(
          JSON.stringify({
            status: 200,
            message: "Success.",
            glucose_data: result,
          })
        );
      })
      .catch((err) => {
        res.end(
          JSON.stringify({
            status: 403,
            message: "Could not return glucose readings for patient.",
          })
        );
      });
  }
);

app.delete(
  "/glucose/patient/:patient_id/reading/:test_id",
  authenticateToken,
  (req, res) => {
    const patient_id = req.params.patient_id;
    const test_id = req.params.test_id;
    GlucoseTest.destroy({
      where: {
        patient_id: patient_id,
        test_id: test_id,
      },
    })
      .then((result) => {
        console.log(`RESULT: ${result}`);
        if (result == 0) {
          res.end(
            JSON.stringify({
              status: 404,
              message: "Reading not found for patient ID " + patient_id,
            })
          );
        } else {
          res.end(
            JSON.stringify({
              status: 200,
              message: `Deleted Glucose Reading ID ${test_id} for Patient with ID ${patient_id}`,
            })
          );
        }
      })
      .catch((err) => {
        console.log(`ERR: ${err}`);
        res.end(
          JSON.stringify({
            status: 403,
            message: "Could not delete glucose reading for patient.",
            error: err,
          })
        );
      });
  }
);

app.patch(
  "/glucose/patient/:patient_id/reading/:test_id",
  authenticateToken,
  (req, res) => {
    const body = req.body;
    const errors = glucoseSchema.validate(body, { abortEarly: false }).error;
    let account_type = req.decodedToken.account_type;
    let patient_id = req.params.patient_id;
    let test_id = req.params.test_id;
    if (account_type != "patient") {
      res.end(
        JSON.stringify({
          status: 403,
          message: "Incorrect account type, only patient allowed.",
        })
      );
      return;
    }

    if (errors == undefined) {
      GlucoseTest.findOne({
        where: {
          patient_id,
          test_id,
        },
      }).then((result) => {
        if (result == null) {
          res.end(
            JSON.stringify({ status: 404, message: "Reading not found" })
          );
        } else {
          result.set(body);
          result.save().then(() => {
            res.end(
              JSON.stringify({ status: 200, message: "Reading updated." })
            );
          });
        }
      });
    } else {
    }
  }
);

// Pairing

app.post("/pair/patient/:patient_id", authenticateToken, (req, res) => {
  const patient_id = req.params.patient_id;
  const account_type = req.decodedToken.account_type;

  if (account_type != "doctor") {
    res.json({
      status: 403,
      message: "This endpoint is to be used by Doctors only.",
    });
    return;
  } else {
    const doctor_id = req.decodedToken.doctor_id;
    Patient.count({ where: { patient_id: patient_id } })
      .then((result) => {
        if (result <= 0) {
          res.json({
            status: 404,
            message: "The specified patient does not exist.",
          });
        }
      })
      .then(
        Doctor.count({
          where: {
            doctor_id: doctor_id,
          },
        }).then((result) => {
          if (result <= 0) {
            res.json({
              status: 404,
              message: "The specified doctor does not exist.",
            });
          } else {
            Supervision.create({
              fk_patient_id: patient_id,
              fk_doctor_id: doctor_id,
            }).then(() => {
              res.json({
                status: 200,
                message: `Patient #${patient_id} paired with Doctor #${doctor_id}`,
              });
              return;
            });
          }
        })
      );
  }
});


app.delete("/pair/patient/:patient_id", authenticateToken, (req, res) => {
  const patient_id = req.params.patient_id;
  const account_type = req.decodedToken.account_type;

  if (account_type != "doctor") {
    res.json({
      status: 403,
      message: "This endpoint is to be used by Doctors only.",
    });
    return;
  } else {
    const doctor_id = req.decodedToken.doctor_id;
    Patient.count({ where: { patient_id: patient_id } })
      .then((result) => {
        if (result <= 0) {
          res.json({
            status: 404,
            message: "The specified patient does not exist.",
          });
        }
      })
      .then(
        Doctor.count({
          where: {
            doctor_id: doctor_id,
          },
        }).then((result) => {
          if (result <= 0) {
            res.json({
              status: 404,
              message: "The specified doctor does not exist.",
            });
          } else {
            Supervision.destroy({where: { patient_id: patient_id}}).then(() => {
              res.json({
                status: 200,
                message: `Patient #${patient_id} unpaired with Doctor #${doctor_id}`,
              });
              return;
            });
          }
        })
      );
  }
});

