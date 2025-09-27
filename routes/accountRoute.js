const express = require('express');
const router = express.Router();

const { buildLogin, buildRegister, processLogin } = require('../controllers/accountController');
const { handleErrors } = require('../utilities'); 

// Deliver login view
router.get('/login', handleErrors(buildLogin));

// Process login
router.post('/login', handleErrors(processLogin));

// Deliver registration view
router.get('/registration', handleErrors(buildRegister));

// Add other routes as needed
// For example:
router.post('/register', handleErrors(require('../controllers/accountController').registerAccount));

module.exports = router;