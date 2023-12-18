import express from "express"
const apiRouter = express.Router()
import { userRouter } from "./users/userRouter.js"

apiRouter.use("/users", userRouter)

apiRouter.get("/test", (req, res) => {
    res.json({ message: "hello, world" })
})

apiRouter.post("/body", (req, res) => {
    console.log(req.body);
  
    res.status(200).send();
  });
  
  apiRouter.use("/users", userRouter);
  apiRouter.use("/experiences", experienceRouter);
  
    
export default apiRouter;
