const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId},
    city: {type: String, required: true},
    type: {type: String, required: true},
    date: Date,
    time: {type: String, required: true},
    details: {type: String, required: true}
    });

const Post = mongoose.model('Event', eventSchema);

module.exports = Post;