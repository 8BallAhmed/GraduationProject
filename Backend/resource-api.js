require("dotenv").config({ path: "./.env" });
const e = require("express");
let { authenticateToken } = require("./auth-api");
const express_app = require("./express-app");
const { foodSchema } = require("./joi-validators");
const model = require("./model");
const axios = require("axios").default;
const Patient = model.Patient;
const Doctor = model.Doctor;
const Activitie = model.Activity;
const Appointment = model.Appointment;
const GlucoseTest = model.GlucoseTest;
const Account = model.Account;
const Supervision = model.Supervision;
const Food = model.Food;
const glucoseSchema = require("./joi-validators").glucoseSchema;
const app = express_app.app;

const APPID = process.env.APPID;
const APPLICATIONKEY = process.env.APPLICATIONKEY;
console.log(`APPID: ${APPID}, \nAPPLICATION KEY: ${APPLICATIONKEY}`);

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
            Supervision.destroy({ where: { patient_id: patient_id } }).then(
              () => {
                res.json({
                  status: 200,
                  message: `Patient #${patient_id} unpaired with Doctor #${doctor_id}`,
                });
                return;
              }
            );
          }
        })
      );
  }
});

// Food CRUD

// Search for a specific food
app.get("/food/search/:query/page/:page", authenticateToken, (req, res) => {
  const query = req.params.query;
  const page = req.params.page;
  let offset = 5;
  let food_names = [];
  axios
    .get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
      headers: {
        "x-app-id": "5c475c16",
        "x-app-key": "8ce769600e4ddd4409260f0520cbbb9f",
      },
    })
    .then((response) => {
      if (response.data.common.length == 0) {
        res.json({ status: 404, message: "No foods found with that name." });
      }
      for (i = offset * page; i < offset * page + 5; i++) {
        food_names.push({
          name: response.data.common[i].food_name,
          serving_unit: response.data.common[i].serving_unit,
        });
      }
    })
    .then(() => res.json({ search_result: food_names }))
    .catch((err) => {
      res.json({
        status: 500,
        message: "An unexpected error occured. Please contact an administrator",
      });
    });
});

// used to view nutients of food
app.get("/food/:food_name/nutrients", authenticateToken, (req, res) => {
  const food_name = req.params.food_name;
  axios
    .post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      { query: food_name },
      {
        headers: {
          "x-app-id": "5c475c16",
          "x-app-key": "8ce769600e4ddd4409260f0520cbbb9f",
        },
      }
    )
    .then((response) => {
      res.json({
        status: 200,
        food_name: response.data.foods[0].food_name,
        serving_quantity: response.data.foods[0].serving_qty,
        calories: response.data.foods[0].nf_calories,
        fat: response.data.foods[0].nf_total_fat,
        saturated_fat: response.data.foods[0].nf_saturated_fat,
        carbs: response.data.foods[0].nf_total_carbohydrate,
        sugars: response.data.foods[0].nf_sugars,
        protein: response.data.foods[0].nf_protein,
      });
      return;
    })
    .catch((err) => {
      res.json({ status: 404, message: "Food item not found." });
    });
});

// Add food item for patient
app.post("/food", authenticateToken, (req, res) => {
  const body = req.body;
  const errors = foodSchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  if (account_type != "patient") {
    res.json({
      status: 403,
      message: "This endpoint is only allowed for patients",
    });
    return;
  }
  let patient_id = req.decodedToken.patient_id;
  //JSON.stringify(body) is used to parse the food item as string, and store it in the database.
  //When retreived, it should be parsed to object.
  Food.create({
    patient_id: patient_id,
    food_item: JSON.stringify({ ...body, date: Date.now() }),
  }).then(() => {
    res.json({ status: 200, message: "Food item successfully added." });
    return;
  });
});

// Get all foods for patient. Pagination active, 5 food items per page.
app.get("/food/page/:page", authenticateToken, (req, res) => {
  let patient_id = req.decodedToken.patient_id;
  let page = req.params.page;
  let food = [];
  Food.findAll({
    where: { patient_id: patient_id },
    offset: page * 5,
    limit: 5,
  })
    .then((response) => {
      response.map((item) => {
        food.push(item.dataValues);
      });
    })
    .then(() => {
      if (food.length == 0) {
        res.json({ status: 404, message: "No more food items found." });
        return;
      }
      res.json({ status: 200, message: "Food fetched", food: food });
      return;
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "An error has occured. Please contact an administrator.",
      });
      return;
    });
});

app.delete("/food/:food_id", authenticateToken, (req, res) => {
  const food_id = req.params.food_id;
  Food.destroy({
    where: {
      food_id: food_id,
    },
  })
    .then((result) => {
      if (result == 1) {
        res.json({ status: 200, message: "Food item deleted" });
      } else {
        res.json({ status: 404, message: "Food item not found." });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "An error has occured, please contact an administrator.",
      });
    });
});

app.get("/food/:food_id", authenticateToken, (req, res) => {
  const food_id = req.params.food_id;
  Food.findByPk(food_id)
    .then((result) => {
      if (result == undefined) {
        res.json({ status: 404, message: "Food item not found" });
      } else {
        res.json({
          status: 200,
          message: "Food item found.",
          ...result.dataValues,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "An error has occured, please contact an administrator.",
      });
    });
});
