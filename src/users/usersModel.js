<<<<<<< Updated upstream
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  adress: {
    type: String,
  },
});
=======
import mongoose from "mongoose"
import { Schema } from "mongoose"

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
>>>>>>> Stashed changes
