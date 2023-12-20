const userService = require("../services/user-service");
const authService = require("../services/auth-service");
const {login} = require("../services/orangehrm-service-helpers");

/**
 * endpoint, which handles login
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.login = function(req, res) {
  const db = req.app.get("db");//get database from express

  userService
    .verify(db, req.body)
    .then(user => {
      authService.authenticate(req.session, user); // mark session as authenticated
      return login();
    })
    .then(response => {
      res.send("login successful");
    })
    .catch(error => {
      if (error === "Login failed") {
        res.status(401).send("login failed");
      } else if (error.message === "Password wrong!") {
        res.status(401).send("Wrong Password!");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
};

/**
 * endpoint, which handles logout
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.logout = function(req, res) {
  authService.deAuthenticate(req.session); //destroy session
  res.send("logout successful");
};

/**
 * endpoint, which returns whether a user is authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.isLoggedIn = function(req, res) {
  if (authService.isAuthenticated(req.session)) { //check via auth-service
    res.send({loggedIn: true});
  } else {
    res.send({loggedIn: false});
  }
};