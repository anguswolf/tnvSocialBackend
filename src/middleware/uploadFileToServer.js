import multer from 'multer';
import path from 'path';

// Configura lo storage di Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/'); // Cartella dove salvare le immagini
    },
    filename: function (req, file, cb) {
        // Genera un nome univoco per il file
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtra solo immagini
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo di file non supportato'), false);
    }
};

// Configura multer
const uploadFileToServer = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite 5MB
});

export default uploadFileToServer;
