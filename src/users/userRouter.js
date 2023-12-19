import express from "express"
import { User } from "./usersModel.js"
import upload from "../multer/multer.js"
import bcrypt from "bcrypt"
import authControl from "../middleware/authControl.js"

const userRouter = express.Router()

userRouter
    .get("/", authControl, async (req, res) => {
        /* WORKING */
        const users = await User.find({})
        res.json(users)
    })

    .get("/me", authControl, async (req, res, next) => {
        /* WORKING */
        try {
            const user = await User.findById(req.params.id)

            if (!user) {
                return res.status(404).send()
            }

            res.json(user)
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
                res.send(updatedUser)
            } catch (error) {
                next(error)
            }
        }
    )

    .post("/", authControl, async (req, res) => {
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

export default userRouter
