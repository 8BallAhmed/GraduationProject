require("dotenv").config({ path: "./.env" });
let { authenticateToken } = require("./auth-api");
const express_app = require("./express-app");
const { foodSchema } = require("./joi-validators");
const model = require("./model");
const Patient = model.Patient;
const Doctor = model.Doctor;
const Activitie = model.Activity;
const Appointment = model.Appointment;
const GlucoseTest = model.GlucoseTest;
const Account = model.Account;
const Supervision = model.Supervision;
const Treatment = model.Treatment;
const Food = model.Food;
const axios = require("axios");
const glucoseSchema = require("./joi-validators").glucoseSchema;
const treatmentSchema = require("./joi-validators").treatmentSchema;
const appointmentSchema = require("./joi-validators").appointmentSchema;
const activitySchema = require("./joi-validators").activitySchema;
const app = express_app.app;

const APPID = process.env.APPID;
const APPLICATIONKEY = process.env.APPLICATIONKEY;

console.log("Resource API Started");
console.log(`APPID: ${APPID}, \nAPPLICATION KEY: ${APPLICATIONKEY}`);

//this endpoint should fetch patient_id and email FK from account table to get personal information such as name, age etc...
//since there is no fk_email ill stick with patient_id as it is for testing purposes
app.get("/patients", authenticateToken, async (req, res) => {
  // Middleware function "authenticateToken" is passed to endpoint
  let accountType = req.decodedToken.account_type;
  let email = req.decodedToken.email;
  let supervisedPatients = [];
  let patientIDs = [];
  let counter = 0;
  let goal = 0;
  if (accountType != "doctor" && accountType != null) {
    res.status(403).end({
      status: 403,
      message: "Unauthorized access. Account must be of type: Doctor.",
    });
    return; // Must add return, or second hit on endpoint will look infinitely
  }
  await Doctor.findOne({ where: { fk_email: email } }).then(async (result) => {
    if (result == null) {
      res.status(404).end(
        JSON.stringify({
          status: 404,
          message: "Doctor for patients not found.",
        })
      );
      return;
    } else {
      let doctor_id = result.dataValues.doctor_id;
      await Supervision.findAll({
        where: {
          fk_doctor_id: doctor_id,
        },
      }).then(async (result) => {
        if (result == null) {
          res.status(404).end(
            JSON.stringify({
              status: 404,
              message: "This Doctor does not treat any patients currently.",
            })
          );
          return;
        } else {
          goal = result.length;
          console.log(`goal: ` + goal);
          result.map((supervised_patient) => {
            patientIDs.push(supervised_patient.dataValues.fk_patient_id);
          });
          patientIDs.map(async (ID) => {
            await Patient.findByPk(ID, { include: [Account, GlucoseTest] }).then(
              async (result) => {
                if (result == undefined) {
                  res.status(500).end(
                    JSON.stringify({
                      status: 500,
                      message:
                        "This Patient does not exist anymore, please contact an administrator or file a bug report",
                    })
                  );
                  return;
                } else {
                  await Account.findByPk(result.dataValues.fk_email)
                    .then(async (accountResult) => {
                      if (accountResult == undefined) {
                        res.status(500).end(
                          JSON.stringify({
                            status: 500,
                            message:
                              "An account for this patient was not found. Please contact an administrator or file a bug report.",
                          })
                        );
                        return;
                      } else {
                        await supervisedPatients.push({
                          name: accountResult.dataValues.name,
                          ...result.dataValues,
                        });
                      }
                    })
                    .then(async () => {
                      console.log("SUPERVISED PATIENTS: " + supervisedPatients);
                      counter++;
                      if (goal == counter) {
                        res.end(
                          JSON.stringify({
                            status: 200,
                            patients: supervisedPatients,
                          })
                        );
                      }
                      return;
                    });
                }
              }
            );
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
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Unauthorized access. Account must be of type: Doctor.",
      })
    );
    return;
  }
  let PatientId = req.params.patientId;
  Patient.findByPk(PatientId, { include: Account }).then((result) => {
    console.log(result);
    res.end(
      JSON.stringify({
        status: 200,
        message: "Query successful",
        patient: result,
      })
    );
  });
});

// an endpoint to look after a patient by his id
app.get("/patient/profile", authenticateToken, (req, res) => {
  // Middleware function "authenticateToken" is passed to endpoint
  let accountType = req.decodedToken.account_type;
  if (accountType != "patient" && accountType != null) {
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Unauthorized access. Account must be of type: Doctor.",
      })
    );
    return;
  }
  let PatientId = req.decodedToken.patient_id;
  Patient.findByPk(PatientId, { include: Account }).then((result) => {
    console.log(result);
    res.end(
      JSON.stringify({
        status: 200,
        message: "Query successful",
        patient: result,
      })
    );
  });
});

app.get("/doctors", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
    return;
  } else {
    Doctor.findAll().then((result) => {
      console.log(result);
      res.end(
        JSON.stringify({
          status: 200,
          message: "Query Successed",
          doctors: result,
        })
      );
    });
  }
});

app.get("/doctors/:doctorID", (req, res) => {
  const header = req.header;
  if (header == undefined) {
    res.status(400).end(
      JSON.stringify({
        status: 400,
        message: "Authentication Header not specified!",
      })
    );
    return;
  } else {
    let DoctorID = req.params.doctorID;
    Doctor.findByPk(DoctorID, { include: Account }).then((result) => {
      return res.json({
        status: 200,
        message: "Query Succeed",
        doctor: result,
        //account: { name: "Dr.Mohammed Al-Sahafi", email: "marwan@gmail.com" },
      });
    });
    return;
  }
});

// an endpoint to get all activites by the patient id

app.get("/activity", authenticateToken, (req, res) => {
  const body = req.body;
  // const errors = activitySchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  let email = req.decodedToken.email;
  let activities = [];
  let patient_id = req.decodedToken.patient_id;
  if (account_type != "patient") {
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Incorrect account type, only patient allowed.",
      })
    );
    return;
  }

  Activitie.findAll({ where: { patient_id: patient_id } })
    .then((response) => {
      response.map((item) => {
        activities.push(item.dataValues);
      });
    })
    .then(() => {
      if (activities.length == 0) {
        res
          .status(404)
          .end(
            JSON.stringify({ status: 404, message: "Activities not found" })
          );
      } else {
        res.status(200).end(
          JSON.stringify({
            status: 200,
            message: "Activities Fetched",
            activites: activities,
          })
        );
      }
    });
});

app.post("/activity", authenticateToken, (req, res) => {
  const body = req.body;
  const errors = activitySchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  let email = req.decodedToken.email;
  let patient_id = req.decodedToken.patient_id;
  if (account_type != "patient") {
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Incorrect account type, only patient allowed.",
      })
    );
    return;
  }

  if (errors == undefined) {
    Activitie.create({ ...body, patient_id }).then(() => {
      res.end(JSON.stringify({ status: 200, message: "Activity Added!" }));
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

app.delete("/activity/:activity_id", authenticateToken, (req, res) => {
  const body = req.body;
  // const errors = activitySchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  const activity_id = req.params.activity_id;
  let patient_id = req.decodedToken.patient_id;
  if (account_type != "patient") {
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Incorrect account type, only patient allowed.",
      })
    );
    return;
  }
  Activitie.destroy({
    where: {
      activity_id: activity_id,
      patient_id: patient_id,
    },
  }).then((result) => {
    if (result == 1) {
      res
        .status(200)
        .end(JSON.stringify({ status: 200, message: "Activity deleted!" }));
    } else {
      res
        .status(404)
        .end(JSON.stringify({ status: 404, message: "Activity not found." }));
    }
  });
});

app.patch("/activity/:activity_id", authenticateToken, (req, res) => {
  const body = req.body;
  const errors = activitySchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  let activity_id = req.params.activity_id;
  let patient_id = req.decodedToken.patient_id;
  if (account_type != "patient") {
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Incorrect account type, only patient allowed.",
      })
    );
    return;
  }

  if (errors == undefined) {
    Activitie.findOne({
      where: {
        patient_id: patient_id,
        activity_id: activity_id,
      },
    }).then((result) => {
      if (result == null) {
        res.end(
          JSON.stringify({
            status: 404,
            message: "Activity not found. Could not update.",
          })
        );
      } else {
        result
          .set(body)
          .save()
          .then(() =>
            res.end(
              JSON.stringify({ status: 200, message: "Activity updated." })
            )
          );
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

// Glucose CRUD

app.post("/glucose", authenticateToken, (req, res) => {
  // Add glucose reading
  const body = req.body;
  const errors = glucoseSchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  let email = req.decodedToken.email;
  if (account_type != "patient") {
    res.status(403).end(
      JSON.stringify({
        status: 403,
        message: "Incorrect account type, only patient allowed.",
      })
    );
    return;
  }
  if (errors == undefined) {
    let account = Patient.findOne({ where: { fk_email: email } }).then(
      (result) => {
        if (result == null) {
          res.status(404).end(
            JSON.stringify({
              status: 404,
              message: "User not found! Blood Glucose not added.",
            })
          );
          return;
        } else {
          let patient_id = result.dataValues.patient_id;
          console.log(`RESULT PATIENT ID: ${result.dataValues.patient_id}`);
          GlucoseTest.create({ ...body, patient_id: patient_id })
            .then(() => {
              res.end(
                JSON.stringify({
                  status: 200,
                  message: "Glucose reading added.",
                })
              );
              return;
            })
            .catch((err) => {
              res.status(401).end(
                JSON.stringify({
                  status: 401,
                  message: "Could not create Glucose Reading!",
                  error: err.errors[0].message,
                })
              );
            });
        }
        return;
      }
    );
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
      offset: page * 5,
      limit: 5,
    })
      .then((result) => {
        res.end(
          JSON.stringify({
            status: 200,
            message: "Success.",
            glucose_data: result,
          })
        );
        return;
      })
      .catch((err) => {
        res.status(403).end(
          JSON.stringify({
            status: 403,
            message: "Could not return glucose readings for patient.",
          })
        );
        return;
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
          res.status(404).end(
            JSON.stringify({
              status: 404,
              message: "Reading not found for patient ID " + patient_id,
            })
          );
          return;
        } else {
          res.end(
            JSON.stringify({
              status: 200,
              message: `Deleted Glucose Reading ID ${test_id} for Patient with ID ${patient_id}`,
            })
          );
          return;
        }
      })
      .catch((err) => {
        console.log(`ERR: ${err}`);
        res.status(403).end(
          JSON.stringify({
            status: 403,
            message: "Could not delete glucose reading for patient.",
            error: err,
          })
        );
        return;
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
      res.status(403).end(
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
          res
            .status(404)
            .end(JSON.stringify({ status: 404, message: "Reading not found" }));
          return;
        } else {
          result.set(body);
          result.save().then(() => {
            res.end(
              JSON.stringify({ status: 200, message: "Reading updated." })
            );
            return;
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
  const doctor_id = req.decodedToken.doctor_id;
  Supervision.count({
    where: { fk_patient_id: patient_id, fk_doctor_id: doctor_id },
  }).then((result) => {
    if (result != 0) {
      return res
        .status(403)
        .end(
          JSON.stringify({
            status: 403,
            message: "Patient Already supervised by a doctor!",
          })
        );
    } else {
      if (account_type != "doctor") {
        return res.status(403).json({
          status: 403,
          message: "This endpoint is to be used by Doctors only.",
        });
        return;
      } else {
        Patient.count({ where: { patient_id: patient_id } })
          .then((result) => {
            if (result <= 0) {
              return res.status(404).json({
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
                return res.status(404).json({
                  status: 404,
                  message: "The specified doctor does not exist.",
                });
              } else {
                Supervision.create({
                  fk_patient_id: patient_id,
                  fk_doctor_id: doctor_id,
                }).then(() => {
                  return res.json({
                    status: 200,
                    message: `Patient #${patient_id} paired with Doctor #${doctor_id}`,
                  });
                  return;
                });
              }
            })
          );
      }
    }
  });
});

app.delete("/pair/patient/:patient_id", authenticateToken, (req, res) => {
  const patient_id = req.params.patient_id;
  const account_type = req.decodedToken.account_type;
  const doctor_id = req.decodedToken.doctor_id;
  if (account_type != "doctor") {
    return res.status(403).json({
      status: 403,
      message: "This endpoint is to be used by Doctors only.",
    });
    return;
  } else {
    Patient.count({ where: {patient_id: patient_id } })
      .then((result) => {
        if (result <= 0) {
          return res.status(404).json({
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
            return res.status(404).json({
              status: 404,
              message: "The specified doctor does not exist.",
            });
          } else {
            Supervision.destroy({ where: { fk_patient_id: patient_id } }).then(
              () => {
                return res.json({
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
        return res
          .status(404)
          .json({ status: 404, message: "No foods found with that name." });
      }
      for (i = offset * page; i < offset * page + 5; i++) {
        food_names.push({
          name: response.data.common[i].food_name,
          serving_unit: response.data.common[i].serving_unit,
        });
      }
    })
    .then(() => res.status(200).json({ search_result: food_names }))
    .catch((err) => {
      return res.status(500).json({
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
      return res.json({
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
      return res
        .status(404)
        .json({ status: 404, message: "Food item not found." });
    });
});

// Add food item for patient
app.post("/food", authenticateToken, (req, res) => {
  const body = req.body;
  const errors = foodSchema.validate(body, { abortEarly: false }).error;
  let account_type = req.decodedToken.account_type;
  if (account_type != "patient") {
    return res.status(403).json({
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
    return res.json({ status: 200, message: "Food item successfully added." });
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
        return res
          .status(404)
          .json({ status: 404, message: "No more food items found." });
        return;
      }
      return res.json({ status: 200, message: "Food fetched", food: food });
      return;
    })
    .catch((err) => {
      return res.status(500).json({
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
        return res.json({ status: 200, message: "Food item deleted" });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Food item not found." });
      }
    })
    .catch((err) => {
      return res.status(500).json({
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
        return res
          .status(404)
          .json({ status: 404, message: "Food item not found" });
      } else {
        return res.json({
          status: 200,
          message: "Food item found.",
          ...result.dataValues,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "An error has occured, please contact an administrator.",
      });
    });
});

// Treatment CRUD

app.get(
  "/treatments/patient/:patient_id/page/:page",
  authenticateToken,
  async (req, res) => {
    let offset = 5;
    let page = req.params.page;
    let patient_id = req.params.patient_id;
    if (
      req.decodedToken.patient_id != undefined &&
      patient_id != req.decodedToken.patient_id
    ) {
      return res.status(403).json({
        status: 403,
        message: "You are not allowed to access other patients' treatments.",
      });
    } else if (req.decodedToken.doctor_id != undefined) {
      await Supervision.count({
        where: {
          fk_doctor_id: req.decodedToken.doctor_id,
          fk_patient_id: req.params.patient_id,
        },
      }).then((response) =>
        response == 1
          ? ""
          : res.end(
              JSON.stringify({
                status: 403,
                message:
                  "You cannot view treatments for patients you do not supervise.",
              })
            )
      );
    }
    await Treatment.findAll({
      where: {
        fk_patient_id: patient_id,
      },
      limit: 5,
      offset: offset * page,
    }).then((result) => {
      if (result.length == 0) {
        return res.status(404).json({
          status: 404,
          message: "No treatments found at page #" + page,
        });
      } else {
        return res.json({
          status: 200,
          message: "Treatments found",
          treatments: result,
        });
      }
    });
  }
);

app.delete("/treatment/:treatment_id", authenticateToken, (req, res) => {
  let treatment_id = req.params.treatment_id;
  if (req.decodedToken.account_type != "doctor") {
    return res.status(403).json({
      status: 403,
      message: "This endpoint is only allowed for doctors.",
    });
  } else {
    Treatment.destroy({
      where: {
        fk_doctor_id: req.decodedToken.doctor_id,
        treatment_id: treatment_id,
      },
    }).then((result) => {
      if (result == 1) {
        return res.json({ status: 200, message: "Treatment deleted" });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Treatment not found, cannot delete.",
        });
      }
    });
  }
});

app.post(
  "/treatment/patient/:patient_id",
  authenticateToken,
  async (req, res) => {
    if (req.decodedToken.account_type != "doctor") {
      console.log(`You're not a doctor!`);
      return res.status(403).json({
        status: 403,
        message: "This endpoint is only allowed for doctors.",
      });
    } else {
      console.log("Flow started...");
      let patient_id = req.params.patient_id;
      await Supervision.count({
        where: {
          fk_patient_id: patient_id,
          fk_doctor_id: req.decodedToken.doctor_id,
        },
      }).then(async (result) => {
        console.log("Supervision counted.");
        if (result != 1) {
          console.log("No supervision exists.");
          return res.status(403).json({
            status: 403,
            message: "You do not supervise this patient.",
          });
        } else {
          console.log("Supervision exists.");
          const body = req.body;
          let errors = treatmentSchema.validate(body, {
            abortEarly: false,
          }).error;
          if (errors == undefined) {
            console.log("No errors whatsoever. Record should be created.");
            await Treatment.create({
              ...body,
              fk_patient_id: patient_id,
              fk_doctor_id: req.decodedToken.doctor_id,
            })
              .then(() => {
                console.log("record created.");
                return res.json({ status: 200, message: "Treatment added." });
              })
              .catch((err) => {
                console.log("an error occured.");
                return res.status(500).json({
                  status: 500,
                  message:
                    "An internal server error occured, please contact an administrator.",
                  error: err.errors,
                });
              });
          } else {
            return res.status(401).json({
              status: 401,
              message: "Bad request",
              errors: errors.details,
            });
          }
        }
      });
    }
  }
);

app.patch(
  "/treatment/:treatment_id/patient/:patient_id/",
  authenticateToken,
  (req, res) => {
    if (req.decodedToken.account_type != "doctor") {
      return res.status(403).json({
        status: 403,
        message: "This endpoint is only allowed for doctors.",
      });
    }
    let patient_id = req.params.patient_id;
    Supervision.count({
      where: {
        fk_patient_id: patient_id,
        fk_doctor_id: req.decodedToken.doctor_id,
      },
    }).then((result) => {
      if (result != 1) {
        return res.status(403).json({
          status: 403,
          message: "You do not supervise this patient.",
        });
      } else {
        const body = req.body;
        let errors = treatmentSchema.validate(body, {
          abortEarly: false,
        }).error;
        if (errors == undefined) {
          Treatment.update(
            {
              ...body,
            },
            {
              where: {
                fk_patient_id: patient_id,
                fk_doctor_id: req.decodedToken.doctor_id,
                treatment_id: req.params.treatment_id,
              },
            }
          )
            .then(() => {
              return res.json({ status: 200, message: "Treatment updated." });
            })
            .catch((err) => {
              return res.status(500).json({
                status: 500,
                message:
                  "An internal server error occured, please contact an administrator.",
              });
            });
        }
      }
    });
  }
);

// Appointment CRUD

app.get(
  "/appointments/patient/:patient_id/page/:page",
  authenticateToken,
  (req, res) => {
    const patient_id = req.params.patient_id;
    const page = req.params.page;
    const offset = 5;
    if (req.decodedToken.account_type == "patient") {
      if (patient_id != req.decodedToken.patient_id) {
        return res.status(403).json({
          status: 403,
          message: "You cannot view appointments which do not belong to you.",
        });
      }
      Appointment.findAll({
        where: {
          fk_patient_id: patient_id,
        },
        limit: 5,
        offset: page * 5,
      }).then((response) => {
        if (response.length == 0) {
          return res.send({
            status: 404,
            message: "No appointments found on page #" + page,
            result: response,
          });
        } else {
          return res.send({
            status: 200,
            message: "Appointments found",
            appointments: response,
          });
        }
      });
    } else {
      // Doctor
      Supervision.findOne({
        where: {
          fk_patient_id: patient_id,
          fk_doctor_id: req.decodedToken.doctor_id,
        },
      }).then((response) => {
        if (response != undefined) {
          Appointment.findAll({
            where: {
              fk_patient_id: patient_id,
              fk_doctor_id: req.decodedToken.doctor_id,
            },
            limit: 5,
            offset: page * 5,
          }).then((response) => {
            if (response.length == 0) {
              return res.send({
                status: 404,
                message: "No appointments found on page #" + page,
              });
            } else {
              return res.send({
                status: 200,
                message: "Appointments found",
                appointments: response,
              });
            }
          });
        } else {
          return res.send({
            status: 403,
            message: "You do not supervise this patient!",
          });
        }
      });
    }
  }
);

app.get("/appointments/doctor/page/:page", authenticateToken, (req, res) => {
  const page = req.params.page;
  const offset = 5;
  //console.log(fk_doctor_id)
  const doctor_id = req.decodedToken.doctor_id;

  if (req.decodedToken.account_type == "doctor") {
    Appointment.findAll({
      where: {
        fk_doctor_id: doctor_id,
      },
      include: [{ model: Patient, include: [Account] }],
      limit: 10,
      //offset: page * 10,
    }).then((appointments) => {
      var list = [];
      appointments.forEach((element) => {
        console.log(element);
        list.push({
          appointment_id: element.appointment_id,
          visit_time: element.visit_time,
          date: element.date,
          name: element.patient.account.name,
          email: element.patient.fk_email,
          diabetes_type: element.patient.patient_id,
        });
      });
      return res.json({ status: 200, message: "success", result: list });
    });
  }
});

app.delete("/appointment/:appointment_id", authenticateToken, (req, res) => {
  const body = req.body;
  const appointment_id = req.params.appointment_id;
  if (req.decodedToken.account_type != "doctor") {
    return res.status(403).json({
      status: 403,
      message: "This endpoint is only allowed for doctors!",
    });
  }

  Appointment.destroy({
    where: {
      fk_doctor_id: req.decodedToken.doctor_id,
      appointment_id: appointment_id,
    },
  })
    .then((result) => {
      if (result == 1) {
        return res.json({ status: 200, message: "Item deleted" });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Apppointment could not be found!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message:
          "An internal server error occured. Please contact an administrator",
        error: err,
      });
    });
});

app.post(
  "/appointment/patient/:patient_id",
  authenticateToken,
  async (req, res) => {
    const body = req.body;
    const patient_id = req.params.patient_id;
    if (req.decodedToken.account_type != "doctor") {
      return res.status(403).json({
        status: 403,
        message: "This endpoint is only allowed for doctors!",
      });
    }

    let errors = appointmentSchema.validate(body, { abortEarly: false }).error;

    if (errors == undefined) {
      await Supervision.count({
        where: {
          fk_patient_id: patient_id,
          fk_doctor_id: req.decodedToken.doctor_id,
        },
      }).then(async (response) => {
        if (response == 0) {
          return res.status(403).json({
            status: 403,
            message: "You do not supervise this patient!",
          });
        } else {
          await Appointment.create({
            ...body,
            fk_patient_id: patient_id,
            fk_doctor_id: req.decodedToken.doctor_id,
          })
            .then(() =>
              res.json({ status: 200, message: "Appointment booked!" })
            )
            .catch((err) =>
              res.status(500).json({
                status: 500,
                message: "An error occured, please contact an administrator.",
                error: err,
              })
            );
        }
      });
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Bad request!", errors: errors });
    }
  }
);

app.patch(
  "/appointment/patient/:patient_id/appointment/:appointment_id",
  authenticateToken,
  async (req, res) => {
    const body = req.body;
    const patient_id = req.params.patient_id;
    const appointment_id = req.params.appointment_id;
    if (req.decodedToken.account_type != "doctor") {
      return res.status(403).json({
        status: 403,
        message: "This endpoint is only allowed for doctors!",
      });
    }

    let errors = appointmentSchema.validate(body, { abortEarly: false }).error;

    if (errors == undefined) {
      await Supervision.count({
        where: {
          fk_patient_id: patient_id,
          fk_doctor_id: req.decodedToken.doctor_id,
        },
      }).then(async (response) => {
        if (response == 0) {
          return res.status(403).json({
            status: 403,
            message: "You do not supervise this patient!",
          });
        } else {
          await Appointment.update(
            {
              ...body,
            },
            {
              where: {
                fk_patient_id: patient_id,
                fk_doctor_id: req.decodedToken.doctor_id,
                appointment_id: appointment_id,
              },
            }
          )
            .then((result) => {
              if (result == 0) {
                return res.status(404).json({
                  status: 404,
                  message:
                    "No appointment exists with this id! Update aborted.",
                });
              }
              res.json({ status: 200, message: "Appointment updated!" });
            })
            .catch((err) =>
              res.status(500).json({
                status: 500,
                message: "An error occured, please contact an administrator.",
                error: err,
              })
            );
        }
      });
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Bad request!", errors: errors });
    }
  }
);
