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

// Update an post
exports.updatePost = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // post info
    //const { title, city, type, details, date} = req.body;
    const newPost = (req.body);

    try {

        // check ID
        let post = await Post.findById(req.params.id);

        // check if post exists
        if(!post) {
            return res.status(404).json({msg: 'Post not found'})
        }

        // verify post's creator
        if(post.creator.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        // update
        post = await Post.findByIdAndUpdate({ _id: req.params.id }, { $set : newPost}, { new: true });

        res.json({post});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

// Delete post
exports.deletePost = async (req, res ) => {
    try {
        // check ID 
        let post = await Post.findById(req.params.id);

        // check if post exists or not
        if(!post) {
            return res.status(404).json({msg: 'Post not found'})
        }

        // verify post's creator
        if(post.creator.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        // delete
        await Post.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Post deleted '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}