import mongoose, { Schema, model } from "mongoose"

const UserSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    company: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
})

export const User = mongoose.model("users", UserSchema)
