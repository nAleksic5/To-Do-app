const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require( "mongoose" );
const dotenv = require('dotenv').config();

const User = require("../models/user");
const UserController = require("../controllers/users");

router.post("/signup", UserController.userSignup)

router.post('/login', UserController.userLogin)

module.exports = router;