import {addPost} from '../../service/postService.js'
import postNormalizer from '../../normalizer/postNormalizer.js';

export default async (req,res) => {
    try {
        const data = {...req.body, userId: req.userId};

        // Aggiungi l'immagine se presente
        if (req.file) {
            data.image = {
                data: req.file.buffer,         // Dati binari
                contentType: req.file.mimetype, // Tipo MIME
            };
        }

        const result = await addPost(data) // promise
        res.status(201).json(postNormalizer(result));
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


