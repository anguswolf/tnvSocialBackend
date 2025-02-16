import { userStatus } from "../const/const.js";
import { Schema } from "mongoose";
import mongoose from "mongoose";

// Avatar predefiniti
const avatarStock = [
    "/public/avatars/avatar1.png",
    "/public/avatars/avatar2.png",
    "/public/avatars/avatar3.png",
    "/public/avatars/avatar4.png",
    "/public/avatars/avatar5.png"
];

const userSchema = new Schema(
    {
        email: { type: String, index: { unique: true } },
        displayName: String,
        displaySurname: String,
        password: String,
        salt: String,
        registrationToken: String,
        status: { type: String, default: userStatus.pending },
        avatar: String, // Aggiunto campo avatar
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            writeConcern: { w: 1, wtimeout: 2000 },
        },
    }
);

// Middleware pre-save per assegnare un avatar random se non presente
userSchema.pre("save", function (next) {
    if (!this.avatar) {
        const randomIndex = Math.floor(Math.random() * avatarStock.length);
        this.avatar = avatarStock[randomIndex];
    }
    next();
});

export const userModel = mongoose.model("users", userSchema);

