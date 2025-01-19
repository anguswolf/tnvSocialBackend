/*
import Joi from 'joi'
import validation from 'express-joi-validation'
const validator = validation.createValidator({passError:true});

export default [
  validator.body(
    Joi.object().keys({
      title: Joi.string().required(),
      text: Joi.string().required(),
      image: Joi.string(),
    })
  ),
]*/

import Joi from 'joi';
import validation from 'express-joi-validation';

const validator = validation.createValidator({ passError: true });

export default [
    validator.body(
        Joi.object().keys({
            title: Joi.string()
                .max(100) // Lunghezza massima 100 caratteri
                .required()
                .messages({
                    'string.max': 'Il titolo può contenere al massimo 100 caratteri.',
                    'any.required': 'Il titolo è obbligatorio.',
                }),
            text: Joi.string()
                .max(2000) // Lunghezza massima 2000 caratteri
                .required()
                .messages({
                    'string.max': 'Il corpo del testo può contenere al massimo 2000 caratteri.',
                    'any.required': 'Il corpo del testo è obbligatorio.',
                }),
            image: Joi.string()
                .pattern(/\.(jpeg|jpg|png)$/i) // Formati accettati: JPEG e PNG
                .custom((value, helpers) => {
                    // Controllo personalizzato per la dimensione dell'immagine
                    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
                    // Simulazione del controllo della dimensione
                    const mockFileSize = getFileSize(value); // Funzione da implementare
                    if (mockFileSize > maxSizeInBytes) {
                        return helpers.message('L\'immagine deve avere una dimensione massima di 5MB.');
                    }
                    return value;
                }, 'Controllo personalizzato per la dimensione dell\'immagine')
                .messages({
                    'string.pattern.base': 'Il file immagine deve essere in formato JPEG o PNG.',
                }),
        })
    ),
];

// Funzione di simulazione per ottenere la dimensione del file (da implementare con una libreria appropriata)
function getFileSize(imagePath) {
    // Questa funzione dovrebbe verificare la dimensione effettiva del file immagine.
    // Puoi implementarla usando librerie come `fs` o middleware per il caricamento di file.
    return 0; // Restituisce 0 come esempio
}
