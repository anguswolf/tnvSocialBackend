import Joi from 'joi';
import validation from 'express-joi-validation';
const validator = validation.createValidator({ passError: true });

export default [
    validator.body(
        Joi.object().keys({
            textComment: Joi.string()
                .max(500)
                .required()
                .messages({
                    'string.max': 'Il corpo del testo può contenere al massimo 500 caratteri.',
                    'any.required': 'Il commento non puo essere vuoto.',
                }),
         })
    ),
];

