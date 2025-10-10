async function addReview(accountId, invId, rating, reviewText) {
    const sql = "INSERT INTO reviews (account_id, inv_id, rating, review_text) VALUES (?, ?, ?, ?)";
    const stmt = await Database.prepare(sql);
    await stmt.execute([accountId, invId, rating, reviewText]);
}

async function getReviewsByVehicle(invId) {
    const sql = `
        SELECT r.*, a.account_firstname, a.account_lastname 
        FROM reviews r
        JOIN account a ON r.account_id = a.account_id
        WHERE r.inv_id = ?`;
    const stmt = await Database.prepare(sql);
    const [rows] = await stmt.execute([invId]);
    return rows;
}

async function getUserReview(accountId, invId) {
    const sql = "SELECT * FROM reviews WHERE account_id = ? AND inv_id = ?";
    const stmt = await Database.prepare(sql);
    const [rows] = await stmt.execute([accountId, invId]);
    return rows[0]; 
}

async function updateReview(reviewId, rating, reviewText) {
    const sql = `
        UPDATE reviews 
        SET rating = ?, review_text = ?, review_date = CURRENT_TIMESTAMP
        WHERE review_id = ?`;
    const stmt = await Database.prepare(sql);
    await stmt.execute([rating, reviewText, reviewId]);
}

async function deleteReview(reviewId) {
    const sql = "DELETE FROM reviews WHERE review_id = ?";
    const stmt = await Database.prepare(sql);
    await stmt.execute([reviewId]);
}

module.exports = { addReview, getReviewsByVehicle, getUserReview, updateReview, deleteReview };