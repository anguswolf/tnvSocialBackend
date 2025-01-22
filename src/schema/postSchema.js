import {now, Schema} from "mongoose";
import mongoose from "mongoose";
const postSchema = new Schema({
    title: String,
    text: String,
    ownerId: {type: Schema.Types.ObjectId, ref: 'users', required: true, default: null},
    image: {
        data: Buffer,          // Dati binari
        contentType: String,   // Tipo MIME (es. 'image/jpeg')
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "users", // Riferimento alla collezione degli utenti
        },
    ],
    likesCount: {
        type: Number,
        default: 0, // Conteggio iniziale dei "mi piace"
    },
    comments: [
        {
            authorId: {
                type: Schema.Types.ObjectId,
                ref: "users", // Riferimento alla collezione degli utenti
                required: true,
            },
            authorName: {
                type: String,
                required: true,
            },
            authorSurname: {
                type: String,
                required: true,
            },
            textComment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now, // Imposta automaticamente la data di creazione
            },
        },
    ],
    commentsCount: {
        type: Number,
        default: 0, // Conteggio iniziale dei "commenti"
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      writeConcern: {w: 1, wtimeout: 2000},
    }
  }
);

postSchema.index({ title: 1 });
postSchema.index({ likes: 1 });
export const postModel = mongoose.model('posts', postSchema);