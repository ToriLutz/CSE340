const invModel = require("../models/inventory-model")
const Util = {}


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


Util.buildVehicleDetail = function(vehicle) {
  // Format price and mileage with commas
  Util.buildVehicleDetail = function(vehicle) {
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicle.inv_price);
  const formattedMileage = new Intl.NumberFormat('en-US').format(vehicle.inv_miles);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${vehicle.inv_make} ${vehicle.inv_model} - Details</title>
      <link rel="stylesheet" href="../css/style.css" />
    </head>
    <body>
      <main class="vehicle-detail">
        <h1>${vehicle.inv_make} ${vehicle.inv_model} (${vehicle.inv_year})</h1>
        <div class="vehicle-container">
          <div class="vehicle-image">
            <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" />
          </div>
          <div class="vehicle-details">
            <h2>Details & Pricing</h2>
            <p><strong>Make:</strong> ${vehicle.inv_make}</p>
            <p><strong>Model:</strong> ${vehicle.inv_model}</p>
            <p><strong>Classification ID:</strong> ${vehicle.classification_id}</p>
            <p><strong>Color:</strong> ${vehicle.inv_color}</p>
            <p><strong>Year:</strong> ${vehicle.inv_year}</p>
            <p><strong>Price:</strong> ${formattedPrice}</p>
            <p><strong>Mileage:</strong> ${formattedMileage} miles</p>
            <p><strong>Description:</strong> ${vehicle.inv_description || 'N/A'}</p>
          </div>
        </div>
      </main> 

    </body>
    </html>
  `;
}
}