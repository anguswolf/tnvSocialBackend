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
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      writeConcern: {w: 1, wtimeout: 2000},
    }
  }
);

postSchema.index({ name: 1 });
export const postModel = mongoose.model('posts', postSchema);