const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');

const Report = mongoose.model(
  'Report',
  new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    message: {
      type: String,
    },
    criminalDescription: {
      type: Object,
    },
    voiceNote: {
      type: String,
    },
    images: {
      type: Array,
    },
    videos: {
      type: Array,
    },
  }),
);

// Storing Images To Products Folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './products/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

//Send Reports To Database
router.post('/report_crime', async (req, res) => {
  console.log('Sending Report...');

  try {
    let report = new Report({
      userID: req.body.UID,
      location: req.body.location,
    });
    //Saving Report
    const result = await report.save();
    console.log(result._id);
  } catch (err) {
    console.log(err);
  }
});

//Send Additional Report Details
router.post('/crime_details', async (req, res) => {
  console.log('Updating Report...');

  try {
    const report = await Report.update(
      {_id: req.params.reportID},
      {
        message: req.body.message,
        criminalDescription: req.body.criminalDescription,
        voiceNote: req.body.voiceNote,
        images: req.body.images,
        videos: req.body.videos,
      },
    );

    //Saving Report
    await report.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
