const Joi = require('joi');

class NotificationDto {

    constructor() {
        this.notificationSchemaDTO = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().min(6).max(30).required(),
            description: Joi.string().required()
        });
    }

    hasAnyError = (body) => {
        const {error} = this.notificationSchemaDTO.validate(body);
        if(error) return error.details[0].message;
    }
}


module.exports = NotificationDto;
