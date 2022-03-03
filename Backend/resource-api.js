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
    const patients = connection.query('SELECT p.patient_id,a.name,a.gender,a.phone_number,a.dob,p.diabetes_type,p.diabetes_treatment,p.bmi FROM patient p , account a where p.fk_email = a.email; ', { type: QueryTypes.SELECT })
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
  "status":200,
  "message":"success",
  "result":[
     {
        "patient_id":1,
        "name":"abdulaziz alghamdi",
        "gender":true,
        "phone_number":"0547261420",
        "dob":"1999-09-17",
        "diabetes_type":"type 1",
        "diabetes_treatment":"pills",
        "bmi":19.89
     },
     {
        "patient_id":2,
        "name":"ahmed alosaimi",
        "gender":true,
        "phone_number":"0543218967",
        "dob":"1999-09-02",
        "diabetes_type":"type 2",
        "diabetes_treatment":"pills",
        "bmi":25.44
     },
     {
        "patient_id":3,
        "name":"mubarak aloufi",
        "gender":true,
        "phone_number":"0543218927",
        "dob":"1999-09-04",
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
    const patient = connection.query(`SELECT p.patient_id,a.name,a.gender,a.phone_number,a.dob,p.diabetes_type,p.diabetes_treatment,p.bmi FROM patient p , account a where p.fk_email = a.email AND p.patient_id = ${PatientId}; `, { type: QueryTypes.SELECT })
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
         "phone_number":"0547261420",
         "dob":"1999-09-17",
         "diabetes_type":"type 1",
         "diabetes_treatment":"pills",
         "bmi":19.89
      }
   ]
}
*/
app.get('/doctors', (req, res) => {
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
      console.log(result)
      res.json({
        status: 200,
        message: 'Query Successed',
        doctors: result
      });
    })
  }
});

app.get('/doctors/:doctorID', (req, res) => {
  const header = req.header
  if (header == undefined) {
    res.end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
  } else {
    let DoctorID = req.params.doctorID
    Doctor.findByPk(DoctorID).then((result) => {
      req.json({
        status: 200,
        message: 'Query Succeed',
        patient: result
      })
    })
  }
});

// an endpoint to get all activites by the patient id
app.get('/activity/:patient_id', (req, res) => {
  const header = req.header
  if (header == undefined) {
    res.end(JSON.stringify({
      status: 400,
      message: 'Authentication Header not specified'
    }))
  } else {
    let PatientId = req.body.patient_id
    Activitie.findByPk(PatientId).then((result) => {
      res.json({
        status: 200,
        message: 'success',
        activities: result
      });
    })
  }
})

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
    let doctorID = req.body.doctor_id
    Appointment.findAll({ where: { fk_doctor_id: doctorID } }).then((result) => {
      res.end(JSON.stringify({
        status: 200,
        message: 'success',
        appoitments: result
      })
      )
    })
  }
});

// this endpoint will list all appointments for given patient id
app.get('/appointment/:patient_id', (req, res) => {
  const header = req.header
  if (header == undefined) {
    res.end(JSON.stringify({
      'status': 400,
      'message': 'Authentication Header not specified'
    })
    )
  } else {
    let patientID = req.body.patient_id
    Appointment.findAll({ where: { fk_patient_id: patientID } }).then((result) => {
      res.end(JSON.stringify({
        status: 200,
        message: 'success',
        appoitments: result
      })
      )
    })
  }
});

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