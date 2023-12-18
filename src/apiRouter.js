import express from "express"
const apiRouter = express.Router()
import { userRouter } from "./users/userRouter.js"

apiRouter.use("/users", userRouter)

apiRouter.get("/test", (req, res) => {
    res.json({ message: "hello, world" })
})

export default apiRouter
