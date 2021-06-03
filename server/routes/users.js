const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 6,
    },
  }),
);

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
    });
    //Saving user to database
    const result = await user.save();
    console.log(result._id);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
