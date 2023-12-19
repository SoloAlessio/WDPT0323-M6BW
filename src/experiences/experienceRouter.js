import express from "express"
import { Experience } from "./experiencesModel.js"

const experienceRouter = express.Router()

experienceRouter.get("/test", async (req, res) => {
    const experience = await Experience.findById("...")
    res.json(experience)
})

export default experienceRouter
