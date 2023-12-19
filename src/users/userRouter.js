import express from "express";
import { upload } from "../multer/multer.js";
import { User } from "./usersModel.js";

const userRouter = express.Router();

userRouter;
userRouter
  .get("/test", async (req, res) => {
    const users = await User.find({});
    res.json(users);
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

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/", async (req, res) => {
  const newUser = new User(req.body); //we can also use create to create and save the new user

  await newUser.save();

  res.status(201).send(newUser);
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send();
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send();
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

export default userRouter;
