const Joi = require("@hapi/joi");

const registerSchema = Joi.object().keys({
	email: Joi.string().min(6).required().email(),
	name: Joi.string().min(6).required(),
	password: Joi.string().min(6).required(),
});

module.exports = registerSchema;
