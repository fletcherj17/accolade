const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // check errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // extract email y password
    const { email, password } = req.body;


    try {
        // check user is unique
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'This user already exists' });
        }

        // create user
        user = new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt );

        // save user
        await user.save();

        // create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // sign el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 28800 // 8 hours
        }, (error, token) => {
            if(error) throw error;

            // confirm message
            res.json({ token  });
        });


    } catch (error) {
        res.status(400).send('There was an error');
    }
}

// Get user by id
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.query.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

