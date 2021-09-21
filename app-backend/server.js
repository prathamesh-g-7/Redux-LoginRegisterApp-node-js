// import dependancies
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Db } from "mongodb";
import { MongoClient } from "mongodb";

import userSchema from "./userModel.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// DB config
const mongoURI =
  "mongodb+srv://admin:AtHaoRroNldFmHr7@cluster0.ghi5h.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

// api routes

app.get("/users", (req, res) => {
  userSchema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/users", async (req, res) => {
  const userData = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
    };

    userSchema.create(userData, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//to check if user having login credentials
app.post("/users/login", (req, res) => {
  MongoClient.connect(mongoURI, (err, db) => {
    if (err) throw err;

    const username = req.body.username;
    const password = req.body.password;

    const dbo = db.db("users");

    dbo.collection("users").findOne({ username }, (err, result) => {
      if (err) throw err;

      if (result) {
        if (result.password === password) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Incorrect Password");
        }
      } else {
        res.status(200).send("User not found");
      }
    });
  });
});

// listen
app.listen(port, console.log(`running on port ${port}`));
