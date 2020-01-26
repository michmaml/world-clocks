/*
* Redirects the user if he/she is logged in or not, used in server.js
*/

module.exports = {
  checkAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/');
  },
  
  checkNotAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  }
};