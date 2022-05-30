const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const path = require("path");

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
dotenv.config();
app.use(cors());

const Port = process.env.PORT || 5000;

app.use("/users", userRoutes);
app.use("/articles", articleRoutes);
app.use('/category', categoryRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



mongoose
  .connect(process.env.CONNECTION_URL)
  .then(app.listen(Port, () => console.log(`connected to mongoDB ${Port}`)))
  .catch((err) => console.log(err));
