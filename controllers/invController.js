const invModel = require("../models/inventory-model")
const utilities = require("../utilities/index")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.detailVehicle = async function(req, res, next) {
  const inv_id = req.params.inv_id;

  try {
    const vehicle = await invModel.getVehicleById(inv_id);
    if (!vehicle) {
      // Handle vehicle not found
      res.status(404).send("Vehicle not found");
      return;
    }

    const vehicleHTML = utilities.buildVehicleDetail(vehicle);
    res.send(vehicleHTML);
  } catch (err) {
    next(err);
  }
}



 module.exports = invCont