const userService = require("../services/user-service");
const authService = require("../services/auth-service");
const {loginOrangeHRM} = require("../services/orangehrm-service-helpers");

/**
 * endpoint, which handles login
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.login = function(req, res) {
  const db = req.app.get("db");

  userService
    .verify(db, req.body)
    .then(user => {
      return authService.authenticate(req.session, user);
    })
    .then(response => {
      return loginOrangeHRM();
    })
    .then(_ => {
      res.send("login successful");
    })
    .catch(error => {
      if (error.message === "Login failed") {
        res.status(401).send("login failed");
      } else if (error.message === "Password wrong!") {
        res.status(401).send("Wrong Password!");
      } else {
        console.error(error);
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
exports.isLoggedIn = async function(req, res) {
  authService.isAuthenticated(req.session).then(val => {
    val ? res.send({loggedIn: true}) : res.send({loggedIn: false});
  });
};