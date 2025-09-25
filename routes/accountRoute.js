// Needed Resources 
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require('../utilities');
router.get('/detail/:account_id', accountController.buildLogin);
router.get('/login', accountController.buildLogin);
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", accountController.buildRegister);
router.get("/login", utilities.handleErrors(accountController.buildRegister));



// Route to build account by classification view
router.get("/type/:account_id", accountController.buildLogin);
router.get("/type/:account_id", accountController.buildRegister);



/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}

module.exports = router;

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)