const express = require("express");

const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

function router(nav) {
  const { getIndex } = adminController(nav);

  adminRouter.route("/").get(getIndex);

  return adminRouter;
}

module.exports = router;
