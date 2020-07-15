const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'}],
    events: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'}]},
    {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;