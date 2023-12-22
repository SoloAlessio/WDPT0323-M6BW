import express from "express"
import { User } from "../users/usersModel.js"
import { Experience } from "../experiences/experiencesModel.js"
import authControl from "../middleware/authControl.js"
import upload from "../multer/multer.js"

const experienceRouter = express.Router()

experienceRouter
    .get("/:id/experiences", async (req, res, next) => {
        //WORKING
        try {
            let experiences = await Experience.find({
                user: req.params.id,
            })
            res.send(experiences)
        } catch (error) {
            next(error)
        }
    })

    .get("/me/experiences", authControl, async (req, res, next) => {
        try {
            const experiences = await Experience.find({ user: req.user._id })
            console.log(experiences)

            res.status(200).json(experiences)
        } catch (error) {
            next(error)
        }
    })

    .get("/:id/experiences/:experienceId", async (req, res, next) => {
        try {
            let experiences = await Experience.find({
                _id: req.params.experienceId,
            })
            res.send(experiences)
        } catch (error) {
            next(error)
        }
    })

    .put("/:id/experiences/:experienceId", async (req, res, next) => {
        try {
            let experience = await Experience.findOneAndUpdate(
                {
                    _id: req.params.experienceId,
                },
                req.body,
                { new: true }
            ).populate("user")
            res.send(experience)
        } catch (error) {
            next(error)
        }
    })

    .delete("/:id/experiences/:experienceId", async (req, res, next) => {
        try {
            await Experience.findOneAndDelete({
                _id: req.params.experienceId,
            })
            res.send(204)
        } catch (error) {
            next(error)
        }
    })

    .post("/experiences", authControl, async (req, res, next) => {
        try {
            let newExperience = await Experience.create({
                ...req.body,
                user: req.user._id,
            })
            console.log(newExperience)
            let profileData = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {
                        experiences: newExperience,
                    },
                },
                { new: true }
            ).populate({
                path: "experiences",
                selector: ["description"],
            })
            res.send(profileData)
        } catch (error) {
            next(error)
        }
    })

    .patch(
        "/experience/:expId/cover",
        authControl,
        upload.single("photo"),
        async (req, res, next) => {
            /* WORKING */
            const { expId } = req.params
            try {
                const updatedExperience = await Experience.findByIdAndUpdate(
                    expId,
                    {
                        photo: req.file.path,
                    }
                )
                res.send(updatedExperience)
            } catch (error) {
                next(error)
            }
        }
    )

export default experienceRouter
