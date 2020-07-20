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

// Update an event
exports.updateEvent = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // event info
    //const { title, city, type, details, date} = req.body;
    const newEvent = (req.body);

    try {

        // check ID
        let event = await Event.findById(req.params.id);

        // check if event exists
        if(!event) {
            return res.status(404).json({msg: 'Event not found'})
        }

        // verify event's creator
        if(event.creator.toString() !== req.user.user.id ) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        // update
        event = await Event.findByIdAndUpdate({ _id: req.params.id }, { $set : newEvent}, { new: true });

        res.json({event});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

// Delete event
exports.deleteEvent = async (req, res ) => {
    try {
        // check ID 
        let event = await Event.findById(req.params.id);

        // check if event exists or not
        if(!event) {
            return res.status(404).json({msg: 'Event not found'})
        }

        // verify event's creator
        if(event.creator.toString() !== req.user.user.id ) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        // delete
        await Event.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Event deleted '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}