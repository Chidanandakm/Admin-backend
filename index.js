const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
dotenv.config();

const Port = process.env.PORT || 5000;

app.use("/users", userRoutes);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(app.listen(Port, () => console.log(`connected to mongoDB ${Port}`)))
  .catch((err) => console.log(err));
