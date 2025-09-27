// controllers/accountController.js
const { getNav } = require('../utilities');
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account-model');

async function buildLogin(req, res, next) {
  let nav = await getNav();
  res.render('account/login', { title: 'Login', nav });
}

async function buildRegister(req, res, next) {
  let nav = await getNav();
  res.render('account/register', { title: 'Register', nav, errors: null });
}

async function processLogin(req, res) {
  // Your login logic here
}

async function registerAccount(req, res) {
  // Your registration logic here
}

module.exports = {
  buildLogin,
  buildRegister,
  processLogin,
  registerAccount,
};