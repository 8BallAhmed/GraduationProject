const express_app = require("./express-app");
const model = require("./model");

const Patient = model.Patient;
const Doctor = model.Doctor;
const Activitie = model.Activity;
const Appointment = model.Appointment;
const GlucostTest = model.GlucoseTest;
const Medicine = model.Medicine;
const Treatment = model.Treatment;

// exported from model.js
const connection = model.connection;
const QueryTypes = model.QueryTypes;
const app = express_app.app;


// take doctor id from jwt token delete it when available
app.get("/patients/:doctor_id", async (req, res) => {
  const header = req.header;
  if (header == undefined) {

    res.status(400).json({ status: 400, message: "Authentication Header not specified!" });

  } else {
    let doctorID = req.params.doctor_id
    try {
      const patients = await connection.query(`SELECT p.patient_id,d.doctor_id,ac.name,p.diabetes_type,a.date
      FROM patient p , doctor d, appointment a , account ac 
      WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = p.fk_email AND a.fk_patient_id = p.patient_id)  AND (a.fk_doctor_id = ${doctorID}) ;`, { type: QueryTypes.SELECT })
      res.json({ status: 200, message: 'success', result: patients })
    } catch (err) {
      res.status(400).end(`Error with retrieving patient information: ${err.stack}`)
    }
  }
});

// take doctor id from jwt token delete it when available

// an endpoint to look after a patient by his id
app.get("/patients/:doctorId/:patientId", async (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!" })
  } else {
    let PatientId = req.params.patientId
    let DoctorId = req.params.doctorId;
    try {
      const patient = await connection.query(
        `SELECT  p.patient_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address,p.diabetes_type,p.diabetes_treatment,p.bmi 
      FROM patient p , account a where p.fk_email = a.email AND p.patient_id = ${PatientId}; `, { type: QueryTypes.SELECT })
      const glucose_readings = await connection.query(`SELECT glucose_level FROM glucose_test where patient_id=${PatientId};`, { type: QueryTypes.SELECT })
      const notes = await connection.query(`SELECT comments,date FROM supervision WHERE fk_patient_id=${PatientId} AND fk_doctor_id=${DoctorId};`, { type: QueryTypes.SELECT })
      res.json({ status: 200, message: 'success', result: { patient, glucose_readings, notes } })
    } catch (err) {
      res.status(400).end(`Error with retrieving patient information: ${err.stack}`)
    }


  }
});

app.get("/doctors", async (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!", })
  } else {
    try {
      const doctors = await connection.query(`
      SELECT d.doctor_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address
      FROM doctor d , account a 
      where d.fk_email = a.email; `, { type: QueryTypes.SELECT })

      res.json({ status: 200, message: 'success', result: doctors })
    } catch (err) {
      res.status(400).end(`Error with retrieving doctors information: ${err.stack}`)
    }
  }
});

app.get("/doctors/:doctor_id", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!", })
  } else {
    let doctorID = req.params.doctor_id;
    const doctors = connection.query(`SELECT d.doctor_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address FROM doctor d , account a where d.fk_email = a.email AND doctor_id=${doctorID}; `, { type: QueryTypes.SELECT })
    doctors.then((result) => {
      res.json({
        status: 200,
        message: 'success',
        result: result
      })
    })
  }
});

// an endpoint to get all activites by the patient id
app.get('/activity/:patient_id', (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!" })
  } else {
    let PatientId = req.params.patient_id
    Activitie.findAll({ where: { patient_id: PatientId } }).then((result) => {
      res.json({
        'status': 200,
        'message': 'success',
        'result': result
      })
    })
  }
})


// this endpoint will list all appointments for given doctor id
app.get('/appointment/:doctor_id', (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({
      status: 400, message: "Authentication Header not specified!",
    })
  } else {
    let doctorID = req.params.doctor_id
    const appointment = connection.query(`
    SELECT ac.name,p.fk_email,p.diabetes_type,a.visit_time,a.date
    FROM patient p , doctor d, appointment a , account ac 
    WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = p.fk_email AND a.fk_patient_id = p.patient_id) AND (a.date >= CURRENT_DATE) AND (a.fk_doctor_id = ${doctorID}) ;`, { type: QueryTypes.SELECT })
    appointment.then((result) => {
      res.json({
        status: 200,
        message: 'success',
        appoitments: result
      })
    })
  }
});

// this endpoint will list the upcoming appointment for patient 
app.get('/appointment-patient/:patient_id', (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!" })
  } else {
    let patient_id = req.params.patient_id
    const appointment = connection.query(`
    SELECT ac.name,a.visit_time,a.date
    FROM patient p , doctor d, appointment a , account ac 
    WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = d.fk_email AND a.fk_patient_id = p.patient_id) AND (a.date >= CURRENT_DATE) AND (a.fk_patient_id = ${patient_id}) ;`, { type: QueryTypes.SELECT })
    appointment.then((result) => {
      res.json({
        status: 200,
        message: 'success',
        result: result
      })
    })
  }
});


// an endpoint to get all the glucose test for given patient id
app.get('/glucose_test/:patient_id', (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!" })
  } else {
    let patientID = req.params.patient_id
    GlucostTest.findAll({ where: { patient_id: patientID } }).then((result) => {
      res.json({
        status: 200,
        message: 'success',
        result: result
      })
    })
  }
})

// an endpoint to get all the treatments given by doctor
app.get('/treatment/:doctor_id', (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!" })
  } else {
    let DoctorID = req.body.doctor_id
    Treatment.findAll({ where: { 'fk_doctor_id': DoctorID } }).then((result) => {
      res.json({
        status: 200,
        message: 'success',
        result: result
      })
    })
  }
})


// an endpoint to get all the treatments given by doctor to patient
app.get('/treatment/:patient_id', (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).json({ status: 400, message: "Authentication Header not specified!" })
  } else {
    let PatientId = req.body.patient_id
    Treatment.findAll({ where: { 'fk_patient_id': PatientId } }).then((result) => {
      res.json({
        status: 200,
        message: 'success',
        result: result
      })
    })
  }
})