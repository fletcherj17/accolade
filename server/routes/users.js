// routes to create users
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// Create a user
// api/users
router.post(
  "/",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("username", "Username is mandatory").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Minimum length: 6 characters").isLength({ min: 6 }),
  ],
  userController.createUser
);

router.get("/", 
auth, 
userController.getUser);

module.exports = router;
