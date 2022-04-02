require("dotenv").config({ path: "./.env" });
let { authenticateToken } = require("./auth-api");
const express_app = require("./express-app");
const model = require("./model");
const Patient = model.Patient;
const Doctor = model.Doctor;
const Activitie = model.Activity;
const Appointment = model.Appointment;
const GlucoseTest = model.GlucoseTest;
const Account = model.Account;
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

app.get("/patients", authenticateToken, (req, res) => {
  // Middleware function "authenticateToken" is passed to endpoint
  let accountType = req.decodedToken.account_type;
  if (accountType != "doctor" && accountType != null) {
    res.end(
      JSON.stringify({
        status: 403,
        message: "Unauthorized access. Account must be of type: Doctor.",
      })
    );
    return; // Must add return, or second hit on endpoint will look infinitely
  }
  //this endpoint should fetch patient_id and email FK from account table to get personal information such as name, age etc...
  //since there is no fk_email ill stick with patient_id as it is for testing purposes
  Patient.findAll().then((result) => {
    console.log(result);
    res.json({
      status: 200,
      message: "Query successful",
      patients: result,
    });
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

app.post("/glucose", authenticateToken, (req, res) => {
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
