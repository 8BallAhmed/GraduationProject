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
  password: joi.string().min(8).alphanum().required(),
  address: joi.exist().required(),
  name: joi.exist().required(),
  ssn: joi.exist().required(),
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
  password: joi.string().min(8).alphanum().required(),
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
