const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

// Check for existing classification
async function getClassificationByName(name) {
  const sql = 'SELECT * FROM classification WHERE classification_name = ?';
  const [rows] = await db.execute(sql, [name]);
  return rows.length > 0 ? rows[0] : null;
}

// Insert new classification
async function insertClassification(name) {
  const sql = 'INSERT INTO classification (classification_name) VALUES (?)';
  const [result] = await db.execute(sql, [name]);
  return result;
}



async function getVehicleById(id) {
  const data = await pool.query(
    `SELECT * FROM public.inventory WHERE inv_id = $1`,
    [id]
  );
  return data.rows.length ? data.rows[0] : null;
}

async function addVehicle(vehicleData) {
  const sql = `
    INSERT INTO inventory (classification_id, make, model, year, price, img_path, thumbnail_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    vehicleData.classification_id,
    vehicleData.make,
    vehicleData.model,
    vehicleData.year,
    vehicleData.price,
    vehicleData.img_path,
    vehicleData.thumbnail_path
  ];
  await db.execute(sql, params);

}

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
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
};







module.exports = {getClassifications, getInventoryByClassificationId, 
  getVehicleById, insertClassification,
   getClassificationByName, addVehicle, buildClassificationList,
   updateInventory

};

