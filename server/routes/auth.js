// authentication
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// login
// api/auth
router.post('/', 
    authController.autenticateUser
);

// get autenticated user
router.get('/',
    auth,
    authController.userAutenticated
);
module.exports = router;