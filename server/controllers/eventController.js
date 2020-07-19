const Event = require('../models/Event');
const { validationResult } = require('express-validator');

exports.createEvent = async (req, res, next) => {
    // check errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }


    try {
        // Create a new event
        const event = new Event(req.body);

        // Save the Creator via JWT
        event.creator = req.user.user.id;

        // save event
        event.save();
        res.json(event);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error, try it again');
    }
}

// Get user's events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json({ events });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error, try it again');
    }
} 