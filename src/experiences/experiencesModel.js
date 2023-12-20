import mongoose, { Schema } from "mongoose"

const ExperienceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    role: {
        type: String,
    },
    company: {
        type: Number,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    area: {
        type: String,
    },
})

export const Experience = mongoose.model("experiences", ExperienceSchema)


