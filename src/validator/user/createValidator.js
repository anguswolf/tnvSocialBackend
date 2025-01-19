import Joi from 'joi'
import validation from 'express-joi-validation'
import {checkEmailExists} from "../../service/userService.js";
const validator = validation.createValidator({passError:true});

const schema = Joi.object({
    displayName: Joi.string().required(),
    displaySurname: Joi.string().required(),
    email: Joi.string().email().required(),
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

// Middleware personalizzato per validare l'email
const validateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const existingEmail = await checkEmailExists(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email già registrata.' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default [
    validator.body(schema), // Valida lo schema base
    validateEmail, // Controlla l'unicità dell'email
];
