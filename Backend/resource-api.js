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
    const patients = connection.query('SELECT p.patient_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address,p.diabetes_type,p.diabetes_treatment,p.bmi FROM patient p , account a where p.fk_email = a.email; ', { type: QueryTypes.SELECT })
    patients.then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
});

/*
{
  {
   "status":200,
   "message":"success",
   "result":[
      {
         "patient_id":1,
         "name":"abdulaziz alghamdi",
         "gender":true,
         "dob":"1999-09-17",
         "phone_number":"0547261420",
         "email":"aziz@gmail.com",
         "city":"jeddah",
         "address":"jaber ibn sinan st.",
         "diabetes_type":"type 1",
         "diabetes_treatment":"pills",
         "bmi":19.89
      },
      {
         "patient_id":2,
         "name":"ahmed alosaimi",
         "gender":true,
         "dob":"1999-09-02",
         "phone_number":"0543218967",
         "email":"ahmed@gmail.com",
         "city":"jeddah",
         "address":"rehanat al jazeerah",
         "diabetes_type":"type 2",
         "diabetes_treatment":"pills",
         "bmi":25.44
      },
      {
         "patient_id":3,
         "name":"mubarak aloufi",
         "gender":true,
         "dob":"1999-09-04",
         "phone_number":"0543218927",
         "email":"mubarak@gmail.com",
         "city":"jeddah",
         "address":"60 road",
         "diabetes_type":"type 1",
         "diabetes_treatment":"pills",
         "bmi":30.15
      }
   ]
}
*/

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
    let PatientId = req.params.patientId
    const patient = connection.query(`SELECT  p.patient_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address,p.diabetes_type,p.diabetes_treatment,p.bmi FROM patient p , account a where p.fk_email = a.email AND p.patient_id = ${PatientId}; `, { type: QueryTypes.SELECT })
    patient.then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
});
/*
{
   "status":200,
   "message":"success",
   "result":[
      {
         "patient_id":1,
         "name":"abdulaziz alghamdi",
         "gender":true,
         "dob":"1999-09-17",
         "phone_number":"0547261420",
         "email":"aziz@gmail.com",
         "city":"jeddah",
         "address":"jaber ibn sinan st.",
         "diabetes_type":"type 1",
         "diabetes_treatment":"pills",
         "bmi":19.89
      }
   ]
}
*/
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
    const doctors = connection.query('SELECT d.doctor_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address FROM doctor d , account a where d.fk_email = a.email; ', { type: QueryTypes.SELECT })
    doctors.then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
});

/*
{
   "status":200,
   "message":"success",
   "result":[
      {
         "doctor_id":1,
         "name":"Marwan Al harbi",
         "gender":true,
         "dob":"1980-09-04",
         "phone_number":"0543218917",
         "email":"Marwan@gmail.com",
         "city":"jeddah",
         "address":"70 road"
      }
   ]
}
*/

app.get("/doctors/:doctor_id", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
    let doctorID = req.params.doctor_id;
    const doctors = connection.query(`SELECT d.doctor_id,a.name,a.gender,a.dob,a.phone_number,a.email,a.city,a.address FROM doctor d , account a where d.fk_email = a.email AND doctor_id=${doctorID}; `, { type: QueryTypes.SELECT })
    doctors.then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
});

/*
{
   "status":200,
   "message":"success",
   "result":[
      {
         "doctor_id":1,
         "name":"Marwan Al harbi",
         "gender":true,
         "dob":"1980-09-04",
         "phone_number":"0543218917",
         "email":"Marwan@gmail.com",
         "city":"jeddah",
         "address":"70 road"
      }
   ]
}
*/

// an endpoint to get all activites by the patient id
app.get('/activity/:patient_id', (req, res) => {
  const header = req.header
  if (header == undefined) {
    res.end(JSON.stringify({
      status: 400,
      message: 'Authentication Header not specified'
    }))
  } else {
    let PatientId = req.params.patient_id
    Activitie.findAll({ where: { patient_id: PatientId } }).then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
})

/*
{
   "status":200,
   "message":"success",
   "result":[
      {
         "activity_id":1,
         "calories":256,
         "duration":"00:30:00",
         "type":"walking",
         "time":"2022-02-14T06:10:00.000Z",
         "patient_id":1
      },
      {
         "activity_id":2,
         "calories":432,
         "duration":"00:50:00",
         "type":"swimming",
         "time":"2022-02-15T06:10:00.000Z",
         "patient_id":1
      },
      {
         "activity_id":3,
         "calories":500,
         "duration":"01:30:00",
         "type":"weight lifting",
         "time":"2022-02-16T06:10:00.000Z",
         "patient_id":1
      }
   ]
}
*/

// this endpoint will list all appointments for given doctor id
app.get('/appointment/:doctor_id', (req, res) => {
  const header = req.header
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': 'Authentication Header not specified'
    })
    )
  } else {
    let doctorID = req.params.doctor_id
    const appointment = connection.query(`
    SELECT 
    ac.name,
    p.fk_email,
    p.diabetes_type,
    a.visit_time,
    a.date
    FROM patient p , doctor d, appointment a , account ac 
    WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = p.fk_email AND a.fk_patient_id = p.patient_id) AND (a.date >= CURRENT_DATE) AND (a.fk_doctor_id = ${doctorID}) ;`, { type: QueryTypes.SELECT })
    appointment.then((result) => {
      res.end(JSON.stringify({
        status: 200,
        message: 'success',
        appoitments: result
      })
      )
    })
  }
});

/*
{
   "status":200,
   "message":"success",
   "appoitments":[
      {
         "name":"abdulaziz alghamdi",
         "fk_email":"aziz@gmail.com",
         "diabetes_type":"type 1",
         "visit_time":"04:00:00",
         "date":"2022-09-17"
      },
      {
         "name":"ahmed alosaimi",
         "fk_email":"ahmed@gmail.com",
         "diabetes_type":"type 2",
         "visit_time":"04:30:00",
         "date":"2022-09-17"
      },
      {
         "name":"mubarak aloufi",
         "fk_email":"mubarak@gmail.com",
         "diabetes_type":"type 1",
         "visit_time":"05:30:00",
         "date":"2022-09-17"
      }
   ]
}
*/

// this endpoint will list the upcoming appointment for patient 
app.get('/appointment-patient/:patient_id', (req, res) => {
  const header = req.header
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': 'Authentication Header not specified'
    })
    )
  } else {
    let patient_id = req.params.patient_id
    const appointment = connection.query(`
    SELECT ac.name,a.visit_time,a.date
    FROM patient p , doctor d, appointment a , account ac 
    WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = d.fk_email AND a.fk_patient_id = p.patient_id) AND (a.date >= CURRENT_DATE) AND (a.fk_patient_id = ${patient_id}) ;`, { type: QueryTypes.SELECT })
    appointment.then((result) => {
      res.end(JSON.stringify({
        status: 200,
        message: 'success',
        appoitments: result
      })
      )
    })
  }
});

/*
{
  "status":200,
  "message":"success",
  "appoitments":[
     {
        "name":"Marwan Al harbi",
        "visit_time":"04:00:00",
        "date":"2022-09-17"
     }
  ]
}
*/

// an endpoint to get all the glucose test for given patient id
app.get('/glucose_test/:patient_id', (req, res) => {
  const header = req.headers
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': "Authentication Header not specified",
    })
    )
  } else {
    let patientID = req.body.patient_id
    GlucostTest.findAll({ where: { patient_id: patientID } }).then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
})
// an endpoint to get all medicines available withing the DB
app.get('/medicine', (req, res) => {
  const header = req.headers
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': "Authentication Header not specified",
    })
    )
  } else {
    Medicine.findAll().then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
})


// an endpoint to get all the treatments given by doctor
app.get('/treatment/:doctor_id', (req, res) => {
  const header = req.headers
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': "Authentication Header not specified",
    })
    )
  } else {
    let DoctorID = req.body.doctor_id
    Treatment.findAll({ where: { 'fk_doctor_id': DoctorID } }).then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
})


// an endpoint to get all the treatments given by doctor to patient
app.get('/treatment/:patient_id', (req, res) => {
  const header = req.headers
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': "Authentication Header not specified",
    })
    )
  } else {
    let PatientId = req.body.patient_id
    Treatment.findAll({ where: { 'fk_patient_id': PatientId } }).then((result) => {
      res.end(JSON.stringify({
        'status': 200,
        'message': 'success',
        'result': result
      }))
    })
  }
})