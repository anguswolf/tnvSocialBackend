import multer from 'multer';

const memoryStorage = multer.memoryStorage();

// Configura Multer per il caricamento dei file
export const uploadFileToMongoMiddleware = (imageField) => {
    return multer({
        storage: memoryStorage,
        limits: { fileSize: 5 * 1024 * 1024 }, // Limite 5MB
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('Formato file non supportato. Solo JPEG e PNG sono consentiti.'));
            }
            cb(null, true);
        },
    }).single(imageField); // Gestisce un singolo file con il nome specificato
};
