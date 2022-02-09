const joi = require("joi");

const registerSchema = joi.object({
  email: joi.exist(),
  password: joi.exist(),
  address: joi.exist(),
  name: joi.exist(),
  ssn: joi.exist(),
  gender: joi.exist(),
  city: joi.exist(),
  dob: joi.exist(),
  account_type: joi.exist(),
});

module.exports.registerSchema = registerSchema;
