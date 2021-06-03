const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

// Imported Routes;
const users = require('./routes/users');
const reports = require('./routes/reports');

//Routes
app.use('/users', users);
app.use('/reports', reports);

mongoose
  .connect('mongodb://localhost/Alert', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(`MongoDB Connection Failed: ${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server Running...'));
