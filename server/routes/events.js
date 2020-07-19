const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Create events
// api/events
router.post('/', 
    auth,
    [
        check('title', 'The event needs a title').not().isEmpty(),
        check('type', 'Please select a type').not().isEmpty(),
        check('details', 'Please enter details').not().isEmpty(),
        check('city', 'Please select a city').not().isEmpty(),
        check('date', 'When is this event?').not().isEmpty()
    ],
    eventController.createEvent
);

// Get events
router.get('/', 
    auth,
    eventController.getEvents
)