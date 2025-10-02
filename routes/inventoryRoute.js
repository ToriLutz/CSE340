const express = require('express');
const router = express.Router();
const utilities = require('../utilities');

const invController = require('../controllers/invController'); 

// Inventory management page
router.get('/', invController.showManagement);

// View vehicles by classification
router.get('/type/:classificationId', invController.buildByClassificationId, utilities.handleErrors(invController.getInventoryJSON));

// Vehicle detail
router.get('/detail/:inv_id', invController.detailVehicle);

// Show form to add a classification
router.get('/add-classification', invController.showAddClassificationForm);

// Show form to add an inventory vehicle
router.get('/add-inventory', invController.showAddInventoryForm);

// Handle submission of new inventory vehicle
router.post('/add-inventory', invController.processAddInventory);

//update inv
router.post("/update/", invController.updateInventory);

// Handle submission of new classification
router.post('/add-classification', 
  require('../utilities/inventory-validation'), // validation middleware
  invController.processAddClassification
);

module.exports = router;