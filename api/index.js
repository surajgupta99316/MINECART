const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/user.js");
const postRoute = require("./routes/posted.js");
const url = "mongodb+srv://suraj:suraj@cluster0.g8uorff.mongodb.net/";

app.get("/", (req, res) => {
  res.send("Hello");
});

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(cors());
app.use(express.json());

app.use("/routes/user", authRoute);
app.use("/routes/posted", postRoute);

app.listen(8000, () => {
  console.log("connected to backed");
  connect();
});
