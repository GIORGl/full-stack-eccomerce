const User = require("../models/user");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const express = require("express");
const jwtSecret = "thisismynewcourse";

const app = express();



const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jsonwebtoken.verify(token, "thisismynewcourse");

    console.log("decoded", decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log("token", token);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
