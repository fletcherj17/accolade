const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    city:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        required: true,
    },
    host: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('Event', EventSchema);