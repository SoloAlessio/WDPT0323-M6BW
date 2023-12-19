import express from "express"
const apiRouter = express.Router()
import userRouter from "./users/userRouter.js"
import experienceRouter from "./experiences/experienceRouter.js"
import loginRouter from "./login.js"

apiRouter.get("/test", (req, res) => {
    res.json({ message: "hello, world" })
})

apiRouter.post("/body", (req, res) => {
    console.log(req.body)

    res.status(200).send()
})

apiRouter.use("/profile", userRouter)
apiRouter.use("/experiences", experienceRouter)
apiRouter.use("/login", loginRouter)

export default apiRouter
