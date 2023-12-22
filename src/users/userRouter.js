import express from "express"
import { User } from "./usersModel.js"
import upload from "../multer/multer.js"
import bcrypt from "bcrypt"
import authControl from "../middleware/authControl.js"
import passport from "passport"
import experienceRouter from "../experiences/experienceRouter.js"

const userRouter = express.Router()

userRouter
    .get("/", authControl, async (req, res, next) => {
        /* WORKING */
        try {
            const users = await User.find().populate("experiences")
            res.json(users)
        } catch (error) {
            res.status(500).send(error)
            next(error)
        }
    })
    .get("/me", authControl, async (req, res, next) => {
        /* WORKING */
        try {
            const user = await User.findOne({ email: req.user.email }).populate(
                {
                    path: "experiences",
                    select: ["description"],
                }
            )
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    })
    .get("/:id", async (req, res, next) => {
        const { id } = req.params
        try {
            const user = await User.findOne({ _id: id })
            res.status(200).json(user)
        } catch (error) {
            next(error)
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

userRouter.use("/", experienceRouter)
