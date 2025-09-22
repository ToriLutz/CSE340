const express = require('express');
const router = express.Router(); 
const errorController = require('../controllers/errorTestController.js');

router.get('/trigger-error', errorController.triggerError);

module.exports = router;
