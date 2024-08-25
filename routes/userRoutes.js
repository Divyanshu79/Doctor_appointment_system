const express = require('express')

const {
    loginController,
    registerController,
} = require("../controllers/userController")


// route obj
const router = express.Router()

//routes
//login || Post
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;

