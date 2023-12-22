import mongoose, { Schema } from "mongoose"

const ExperienceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
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
    photo: {
        type: String,
        required: false,
    },
})

export const Experience = mongoose.model("experiences", ExperienceSchema)
