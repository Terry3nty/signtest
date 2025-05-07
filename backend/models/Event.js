const mongoose = require ('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    createdAt: {type: Date, defualt: Date.now},
});

module.exports = mongoose.model('Event', eventSchema);