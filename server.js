const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

const playerRoutes = require("./routes/player");

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/player", playerRoutes);

mongoose
  .connect("mongodb://localhost:27017/TeamsDB")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  })
  .catch((err) => console.error("Failed to connect", err));
