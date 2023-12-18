import express from "express";
const userRouter = express.Router();
import { User } from "./models/users.js";

userRouter
  .get("/test", async (req, res) => {
    const user = await User.findById("...");
    res.json(user);
  })

  .patch("/:id/avatar", upload.single("avatar"), async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      user.avatar = req.file.path;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  });
export default userRouter;
