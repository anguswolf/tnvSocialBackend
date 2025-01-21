import { Schema } from "mongoose";
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