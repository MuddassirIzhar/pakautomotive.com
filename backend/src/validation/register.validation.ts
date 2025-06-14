import { Joi } from 'express-validation';

export const registerValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().required(),
})