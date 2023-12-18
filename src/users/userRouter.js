import express from "express";
const userRouter = express.Router();
import { User } from "./models/users.js";

userRouter.get("/test", async (req, res) => {
  const user = await User.findById("...");
  res.json(user);
});

export default userRouter;
