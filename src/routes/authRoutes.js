const passport = require("passport");
const express = require("express");

const authController = require("../controllers/authController");

const authRouter = express.Router();

function router(nav) {
  const {
    signUp, signin, logout, middleware, profile
  } = authController(
    nav
  );

  authRouter.route("/signUp").post(signUp);

  authRouter.route("/signin").get(signin).post(passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failureRedirect: "/"
  }));

  authRouter.route("/logout").all(middleware).get(logout);

  authRouter.route("/profile").all(middleware).get(profile);

  return authRouter;
}

module.exports = router;
