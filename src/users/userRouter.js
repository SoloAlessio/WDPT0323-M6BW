import express from "express";
const userRouter = express.Router();
import { User } from "./models/users.js";

userRouter.get("/test", async (req, res) => {
  const user = await User.findById("655bb0def47dc0bbbd21a6b4");
  res.json(user);
});

export default userRouter;
