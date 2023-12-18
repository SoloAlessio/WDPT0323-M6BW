import { Schema, model } from "mongoose"

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
})

export default model("User", UserSchema)
