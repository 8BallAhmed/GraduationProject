require("dotenv").config({ path: "./.env" });
const express_app = require("./express-app");
const model = require("./model");
const Patient = model.Patient;
const Doctor = model.Doctor;
const Activitie = model.Activity;
const Appointment = model.Appointment;
const app = express_app.app;

app.get("/patients", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
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
  }
});

// an endpoint to look after a patient by his id
app.get("/patients/:patientId", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
    let PatientId = req.params.patientId;

    Patient.findByPk(PatientId).then((result) => {
      console.log(result);
      res.json({
        status: 200,
        message: "Query successful",
        patients: result,
      });
    });
  }
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
        patient: result,
      });
    });
  }
});

// an endpoint to get all activites by the patient id
app.get("/activity/:patient_id", (req, res) => {
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
app.get("/appointment", (req, res) => {
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
