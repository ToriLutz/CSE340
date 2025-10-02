const jwt = require('jsonwebtoken');

function checkAuthRole(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    // No token
    req.flash('error', 'Please log in to access this page.');
    return res.redirect('/account/login');
  }

  try {
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // Check the account type
    const accountType = userData.account_type; 
    if (accountType === 'Employee' || accountType === 'Admin' ) {
      // Authorized
      res.locals.user = userData; 
      return next();
    } else {
      // Not authorized
      req.flash('error', 'You do not have permission to access this page.');
      return res.redirect('/account/login');
    }
  } catch (err) {
    // Invalid token
    req.flash('error', 'Session expired or invalid. Please log in again.');
    return res.redirect('/account/login');
  }
}

//setting User

function setUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      res.locals.user = user; 
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
}



module.exports = {checkAuthRole, setUser};