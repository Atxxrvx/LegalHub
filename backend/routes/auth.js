const router = require('express').Router();
const authControllers = require('../controllers/authController');

router.post("/new", authControllers.newUser);

router.post("/login", authControllers.loginUser);

module.exports = router;