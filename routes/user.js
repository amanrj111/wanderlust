const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controllers/users.js");

router
  .route("/signup")
  .get(UserController.renderSignUpForm)
  .post(wrapAsync(UserController.signUp));

router
  .route("/login")
  .get(UserController.renderLogInForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    UserController.logIn
  );

router.get("/logout", UserController.logOut);

module.exports = router;
