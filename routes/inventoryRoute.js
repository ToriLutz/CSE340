// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
router.get('/detail/:inv_id', invController.detailVehicle);


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));



// router.get('/test', (req, res) => {
//   res.send('Inventory route is working!');
// });


router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;

