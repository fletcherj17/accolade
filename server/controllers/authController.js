const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticateUser = async (req, res) => {
    // check if there is an error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // extract email and password
    const { email, password } = req.body;

    try {
        // check if an user is registered
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({msg: 'This user does not exists'});
        }

        // check password
        const correctPass = await bcryptjs.compare(password, user.password);
        if(!correctPass) {
            return res.status(400).json({msg: 'Wrong Password ' })
        }

        // if everything is ok, create JWT and sign it
         const payload = {
            user: {
                id: user.id
            }
        };

        //  sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 28800 // 8 hours
        }, (error, token) => {
            if(error) throw error;

            // confirmation message
            res.json({ token  });
        });

    } catch (error) {
        res.json({ msg: 'There was an error' });
    }
}


// Get autenticated user 
exports.userAutenticated = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}