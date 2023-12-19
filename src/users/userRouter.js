import express from "express"
import { User } from "./usersModel.js"
import upload from "../multer/multer.js"

const userRouter = express.Router()

userRouter
    .get("/", async (req, res) => {
        const users = await User.find({})
        res.json(users)
    })

    .get("/:id", async (req, res, next) => {
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

    .patch("/:id/avatar", upload.single("avatar"), async (req, res, next) => {
        try {
            const { id } = req.params
            const updatedUser = await User.findByIdAndUpdate(id, {
                image: req.file.path,
            })
            res.json(updatedUser)
        } catch (error) {
            next(error)
        }
    })

    .post("/", async (req, res) => {
        /* WORKING */
        const newUser = User.create(req.body)

        res.status(201).json(newUser)
    })

    .delete("/:id", async (req, res, next) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)

            if (!deletedUser) {
                return res.status(404).send()
            }

            res.status(204).send()
        } catch (error) {
            res.status(500).send()
        }
    })

export default userRouter
