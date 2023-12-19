import express from "express"
import { Experience } from "./experiencesModel.js"

const experienceRouter = express.Router()

experienceRouter
    .get("/test", async (req, res) => {
        const experience = await Experience.findById("...")
        res.json(experience)
    })
    .post("/test", async (req, res) => {
        res.json({ message: "POST working" })
    })

export default experienceRouter
