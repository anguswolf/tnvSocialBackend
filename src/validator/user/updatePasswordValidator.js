import Joi from 'joi'
import validation from 'express-joi-validation'
import {checkEmailExists} from "../../service/userService.js";
const validator = validation.createValidator({passError:true});

const schema = Joi.object({

    userId: Joi.string().required(),
    registrationToken: Joi.string().required(),
    password: Joi.string()
        .min(8)
        .regex(/[a-z]/) // Almeno una lettera minuscola
        .regex(/[A-Z]/) // Almeno una lettera maiuscola
        .regex(/[0-9]/) // Almeno un numero
        .required()
        .messages({
            'string.min': 'La password deve contenere almeno 8 caratteri.',
            'string.pattern.base': 'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero.',
            'any.required': 'La password è obbligatoria.',
        }),
});


export default [
    validator.body(schema) // Valida lo schema base

];
