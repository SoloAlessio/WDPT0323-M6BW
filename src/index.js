import express from "express";
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";
const server = express();
server.use(express.json());
const port = 3030;
server.use("/api", apiRouter);

mongoose
  .connect(".....link.....mongodb+srv://...")
  .then(() => {
    server.listen(port, () => {
      console.log("server is listening to port: " + port);
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });

server.listen(port, () => {
  console.log("server is running on port: ", port);
});
