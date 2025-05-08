// server.js
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
require ('dotenv').config();

const app = express ();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
  });

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((err) => console.error (err));