const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const Port = process.env.PORT || 5000;

app.use("/users", userRoutes);
app.use("/articles", articleRoutes);


mongoose
  .connect(process.env.CONNECTION_URL)
  .then(app.listen(Port, () => console.log(`connected to mongoDB ${Port}`)))
  .catch((err) => console.log(err));
