const Joi = require("@hapi/joi");

const loginSchema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
});


module.exports = loginSchema