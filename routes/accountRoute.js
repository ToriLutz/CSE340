const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const { handleErrors } = require('../utilities');
const { loginRules, checkLoginData } = require('../utilities/account-validation'); 

// Deliver login view
router.get('/login', handleErrors(accountController.buildLogin));

// Process login (your existing login handler in controller)
router.post(
  '/login',
  loginRules(),
  checkLoginData,
  handleErrors(accountController.accountLogin)
);

// Deliver registration view
router.get('/registration', handleErrors(accountController.buildRegister));

// Handle registration form submission
router.post(
  '/register',
  // if you have registration validation, add rules and checks here
  handleErrors(accountController.registerAccount)
);

// Show account page (protected route)
router.get('/', accountController.getAccountPage);

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

module.exports = router;