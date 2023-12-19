<<<<<<< Updated upstream
import express from "express";
const apiRouter = express.Router();
=======
import express from "express"
const apiRouter = express.Router()
import userRouter from "./users/userRouter.js"
import experienceRouter from "./experiences/experienceRouter.js"
apiRouter.use("/users", userRouter)
>>>>>>> Stashed changes

apiRouter.get("/test", (req, res) => {
  res.json({ message: "hello, world" });
});

<<<<<<< Updated upstream
export default apiRouter;
=======
apiRouter.post("/body", (req, res) => {
    console.log(req.body)

    res.status(200).send()
})

apiRouter.use("/users", userRouter)
apiRouter.use("/experiences", experienceRouter)

export default apiRouter
>>>>>>> Stashed changes
