const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    city:{
        type: String,
        required: true
    },
    type: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    pay: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
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

module.exports = mongoose.model('Post', PostSchema);
