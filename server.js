/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const path = require('path')
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
const inventoryRoute = require('./routes/inventoryRoute');
const router = express.Router();
const inventoryController = require('./controllers/invController');




/* ***********************
 * view Engine and Templates
 *************************/
app.use(static)
app.use(express.static('public'))



// Use the routes
// Import the route


// Use the route
app.use('/inv', inventoryRoute);



//index route 
app.get("/", utilities.handleErrors(baseController.buildHome))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

// Inventory routes
app.use("/inv", inventoryRoute)


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})