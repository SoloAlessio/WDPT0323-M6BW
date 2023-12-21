import express from "express"
import { User } from "./usersModel.js"
import upload from "../multer/multer.js"
import bcrypt from "bcrypt"
import authControl from "../middleware/authControl.js"
import { Experience } from "../experiences/experiencesModel.js"
import passport from "passport"

const userRouter = express.Router()

userRouter
    .get("/", authControl, async (req, res, next) => {
        /* WORKING */
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            res.status(500).send(error)
            next(error)
        }
    })
    .get("/:id", authControl, async (req, res, next) => {
        /* WORKING */
        try {
            /*             const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).send()
            }
            res.json(user) */
            res.status(200).json(req.user)
        } catch (err) {
            next(err)
        }
    })

    .patch(
        "/:id/avatar",
        authControl,
        upload.single("avatar"),
        async (req, res, next) => {
            /* WORKING */
            try {
                const { id } = req.params
                const updatedUser = await User.findByIdAndUpdate(id, {
                    image: req.file.path,
                })
                res.json(updatedUser)
                console.log(req.file.path)
            } catch (error) {
                next(error)
            }
        }
    )

    .post("/", async (req, res) => {
        /* WORKING */
        const password = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            ...req.body,
            password: password,
        })

        res.status(201).send(newUser)
    })

    .delete("/:id", authControl, async (req, res, next) => {
        /* WORKING */
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)

            if (!deletedUser) {
                return res.status(404).send()
            }

            res.status(204).send({ message: "User deleted" })
        } catch (error) {
            next(error)
        }
    })

    //EXPERIENCE

    .get("/:id/experiences", async (req, res, next) => {
        //WORKING
        try {
            let experiences = await Experience.find({
                blog: req.params.id,
            }).populate("email")
            res.send(experiences)
        } catch (error) {
            next(error)
        }
    })

    .get("/:id/experiences/:experienceId", async (req, res, next) => {
        try {
            let experiences = await Experience.find({
                _id: req.params.experienceId,
            }).populate({
                model: "User",
                select: ["name", "surname", "email"],
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
            ).populate({
                model: "User",
                select: ["name", "surname", "email"],
            })
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

    .post("/:id", async (req, res, next) => {
        try {
            let newExperience = await Experience.create({
                ...req.body,
                user: req.params.id,
            })
            console.log(newExperience)
            let profileData = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        experience: newExperience,
                    },
                },
                { new: true }
            ).populate({
                populate: {
                    model: "User",
                    select: ["name", "surname", "email"],
                },
            })
            res.send(profileData)
        } catch (error) {
            next(error)
        }
    })

    //OAUTH 2 routes

    .get(
        "/oauth-google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
            prompt: "select_account",
        })
    )

    .get(
        "/oauth-callback",
        passport.authenticate("google", {
            failureRedirect: "/",
            session: false,
        }),
        async (req, res) => {
            const payload = { id: req.user._id }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            })
            res.redirect(
                `http://localhost:3000?token=${token}&userId=${req.user._id}`
            )
        }
    )

// Logout
//  .delete("/session", async (req, res) => {})

export default userRouter
