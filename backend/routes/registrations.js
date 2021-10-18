const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const states = require("../utils/states");

/**
 * fetch schedule
 */
router.get("/", function (req, res) {
  // Fetch from the database

  res.send({ success: true });
});

/**
 * Register
 */
router.post(
  "/",
  [
    body("phone").isMobilePhone(),
    body("email").isEmail({}),
    body("address").isString(),
    body("state").isIn(Object.values(states)),
    body("city").isString(),
    body("name").isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Cerate a new record in db
    res.send({ success: true });
  }
);

module.exports = router;
