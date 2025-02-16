const Joi = require('joi');

const notificationSchemaDTO = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(6).max(30).required(),
    description: Joi.string().required()
});

const hasAnyError = (body) => {
    const {error} = notificationSchemaDTO.validate(body);
    if(error) return error.details[0].message;
}

module.exports = {
    hasAnyError
}
