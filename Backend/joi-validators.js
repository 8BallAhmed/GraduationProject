const joi = require("joi");

const registerSchema = joi.object({
  email: joi.string().email({
    tlds: {
      allow: true,
    },
  }),
  password: joi.string().min(8).alphanum(),
  address: joi.exist(),
  name: joi.exist(),
  ssn: joi.exist(),
  gender: joi.exist(),
  city: joi.exist(),
  dob: joi.exist(),
  account_type: joi.string().required().equal("patient", "doctor"),
});

module.exports.registerSchema = registerSchema;
