// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
router.get('/detail/:inv_id', invController.detailVehicle);


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

detailVehicle: async (req, res, next) => {
    const inv_id = req.params.inv_id;
    try {
      const vehicle = await invModel.getVehicleById(inv_id);
      if (!vehicle) {
        return res.status(404).send('Vehicle not found');
      }
      const htmlContent = utilities.buildVehicleDetail(vehicle);
      res.send(htmlContent);
    } catch (err) {
      next(err);
    }
};

module.exports = router;

