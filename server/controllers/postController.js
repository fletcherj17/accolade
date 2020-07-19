const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.createPost = async (req, res) => {

    // check errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }


    try {
        // Create a new post
        const post = new Post(req.body);

        // Save the Creator via JWT
        post.creator = req.user.id;

        // save post
        post.save();
        res.json(post);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error, try it again');
    }
}

// Get user's posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error, try it again');
    }
}
