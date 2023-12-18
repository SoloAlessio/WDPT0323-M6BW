import { Schema, model } from "mongoose"

const ExperienceSchema = new Schema({
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

export const Experience = mongoose.model("experiences", ExperienceSchema);

