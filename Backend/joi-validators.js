const joi = require("joi");

const registerSchema = joi.object({
  email: joi
    .string()
    .email({
      tlds: {
        allow: true,
      },
    })
    .required(),
  password: joi.string().min(8).required(),
  address: joi.exist().required(),
  name: joi.exist().required(),
  SSN: joi.exist().required(),
  gender: joi.exist().required(),
  city: joi.exist().required(),
  dob: joi.exist().required(),
  account_type: joi.string().required().equal("patient", "doctor").required(),
});

const loginSchema = joi.object({
  email: joi
    .string()
    .email({
      tlds: { allow: true },
    })
    .required(),
  password: joi.string().min(8).required(),
});

const pwdResetSchema = joi.object({
  email: joi
    .string()
    .email({
      tlds: { allow: true },
    })
    .required(),
  oldPwd: joi.string().min(8).required(),
  newPwd: joi.string().min(8).required(),
});

const glucoseSchema = joi.object({
  glucose_level: joi.number().required(),
  blood_pressure: joi.string(),
  pills: joi.string(),
  activity: joi.string(),
  meal: joi.string(),
  time_interval: joi.string(),
  time: joi.date().required(), // The timing of the glucose reading is required
});

const foodSchema = joi.object({
  food_name: joi.string().required(),
  serving_quantity: joi.string().required(),
  calories: joi.number().required(),
  fat: joi.number().required(),
  saturated_fat: joi.number().required(),
  carbs: joi.number().required(),
  sugars: joi.number().required(),
  protein: joi.number().required(),
});

const treatmentSchema = joi.object({
  medicine_name: joi.string().required(),
  description: joi.string().required(),
  unit: joi.string().required(),
});


const activitySchema = joi.object({
  calories: joi.string().required(),
  duration: joi.string().required(),
  type: joi.string().required(),
  time: joi.date().required()
});

const appointmentSchema = joi.object({
  visit_time: joi.string().required(),
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
module.exports.pwdResetSchema = pwdResetSchema;
module.exports.glucoseSchema = glucoseSchema;
module.exports.foodSchema = foodSchema;
module.exports.treatmentSchema = treatmentSchema;
module.exports.appointmentSchema = appointmentSchema;
module.exports.activitySchema = activitySchema;
