const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { Router } = require("express");
require("dotenv/config");

userRouter.get("/", async (req, res) => {
  const users = await User.find().select("-passwordHash");
  if (!users) return res.status(500).send("Not Found");
  res.status(200).json(users);
});
userRouter.get("/:id", async (req, res) => {
  try {
    let user;
    if (mongoose.isValidObjectId(req.params.id))
      user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(500).send("Not Found");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRouter.post("/", async (req, res) => {
  try {
    let user = User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });
    user = await user.save();
    if (!user) return res.status(500).send("Not Saved");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRouter.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Invalid Email");
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        user: user.id,
      },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      user: user.email,
      token: token,
    });
  } else {
    res.status(400).send("Not Authenticated");
  }
});

module.exports = userRouter;
