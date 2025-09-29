const invModel = require("../models/inventory-model")
const utilities = require("../utilities/index")



const invCont = {}
// Show inventory management page
invCont.showManagement = async (req, res) => {
  try {
    const messages = req.flash(); 
    res.render('inventory/index', {
      title: 'Inventory Management',
      messages: messages
    });
  } catch (err) {
    res.status(500).send('Error loading management view');
  }
};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

// Detail vehicle
invCont.detailVehicle = async function (req, res, next) {
  try {
    console.log('inv_id:', req.params.inv_id); 
    const inv_id = req.params.inv_id;

    const vehicle = await invModel.getVehicleById(inv_id);
    if (!vehicle) {
      res.status(404).send("Vehicle not found");
      return;
    }

    const vehicleHTML = utilities.buildVehicleDetail(vehicle);
    res.send(vehicleHTML);
  } catch (err) {
    console.error('Error in detailVehicle:', err);
    next(err);
  }
};

// Show the form
invCont.showAddClassificationForm = (req, res) => {
  res.render('inventory/add-classification', {
    title: 'Add Classification',
    messages: req.flash(),
    errors: null,
    classification_name: req.body ? req.body.classification_name : ''
  });
};


const buildClassificationList = async (selectedId = null) => {
  const classifications = await invModel.getClassifications();
  let options = '<select name="classification_id" id="classification_id" required>';
  options += "<option value=''>Choose a Classification</option>";
  classifications.rows.forEach(row => {
    options += `<option value="${row.classification_id}"`;
    if (row.classification_id == selectedId) {
      options += ' selected';
    }
    options += `>${row.classification_name}</option>`;
  });
  options += '</select>';
  return options;
}


// Process form submission
invCont.processAddClassification = async (req, res, next) => {
  const { classification_name } = req.body;
  

  // Server-side validation (validate pattern, etc.)
  const errors = [];

  if (!classification_name || !/^[A-Za-z0-9]+$/.test(classification_name)) {
    errors.push({ msg: 'Classification name must contain only letters and numbers, no spaces or special characters.' });
  }

  // Check for duplicate classification
  const existing = await invModel.getClassificationByName(classification_name);
  if (existing) {
    errors.push({ msg: 'This classification already exists.' });
  }

  if (errors.length > 0) {
    // Render form with errors
    res.render('inventory/add-classification', {
      title: 'Add Classification',
      errors: { array: () => errors },
      classification_name,
      messages: req.flash()
    });
  } else {
    // Insert into DB
    try {
      await invModel.insertClassification(classification_name);
      
      // Create success flash message
      req.flash('success', 'Classification added successfully.');

      // Update navigation (assuming you have a way to refresh nav)
      // Redirect to management page; navigation will update on page reload
      res.redirect('/inv');

    } catch (err) {
      console.error('Error inserting classification:', err);
      req.flash('error', 'Failed to add classification.');
      res.redirect('/inv/add-classification');
    }
  }
};

invCont.showAddInventoryForm = async (req, res) => {
  const classificationList = await buildClassificationList();
  res.render('inventory/add-inventory', {
    title: 'Add Vehicle',
    messages: req.flash(),
    errors: null,
    classificationList,
    make: req.body?.make,
    model: req.body?.model,
    year: req.body?.year,
    price: req.body?.price,
    img_path: req.body?.img_path,
    thumbnail_path: req.body?.thumbnail_path
  });
};


// Process adding a new vehicle
invCont.processAddInventory = async (req, res) => {
  const {
    classification_id,
    make,
    model,
    year,
    price,
    img_path,
    thumbnail_path
  } = req.body;

  const errors = [];

  // Validation
  if (!classification_id) errors.push({ msg: 'Please select a classification.' });
  if (!make || !/^[A-Za-z0-9 ]+$/.test(make)) errors.push({ msg: 'Invalid make.' });
  if (!model || !/^[A-Za-z0-9 ]+$/.test(model)) errors.push({ msg: 'Invalid model.' });
  if (!year || isNaN(year) || year < 1900 || year > 2100) errors.push({ msg: 'Invalid year.' });
  if (!price || isNaN(price) || price < 0) errors.push({ msg: 'Invalid price.' });

  if (errors.length > 0) {
    const classificationList = await buildClassificationList(classification_id);
    res.render('inventory/add-inventory', {
      title: 'Add Vehicle',
      errors,
      messages: req.flash(),
      classificationList,
      make,
      model,
      year,
      price,
      img_path,
      thumbnail_path
    });
    return;
  }

  try {
    await invModel.addVehicle({
      classification_id,
      make,
      model,
      year,
      price,
      img_path,
      thumbnail_path
    });
    req.flash('success', 'Vehicle added successfully.');
    res.redirect('/inv');
  } catch (err) {
    console.error('Error adding vehicle:', err);
    req.flash('error', 'Failed to add vehicle.');
    const classificationList = await buildClassificationList(classification_id);
    res.render('inventory/add-inventory', {
      title: 'Add Vehicle',
      errors: [{ msg: 'Database error, please try again.' }],
      messages: req.flash(),
      classificationList,
      make,
      model,
      year,
      price,
      img_path,
      thumbnail_path
    });
  }
};




// Export the object
module.exports = invCont;