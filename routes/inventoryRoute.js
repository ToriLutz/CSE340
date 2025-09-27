// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
router.get('/detail/:inv_id', invController.detailVehicle);


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// router.get('/test', (req, res) => {
//   res.send('Inventory route is working!');
// });


module.exports = router;

