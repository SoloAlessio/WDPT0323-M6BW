import express from "express";
const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
  res.json({ message: "hello, world" });
});

export default apiRouter;
