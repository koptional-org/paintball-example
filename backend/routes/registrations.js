const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const states = require("../utils/states");
const { sequelize, Registration } = require("../models/models");

/**
 * fetch schedule
 */
router.get("/", async (req, res) => {
  const regs = await sequelize.models.Registration.findAll();
  res.send({ rows: regs });
  return;
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
    body("state").isIn(Object.keys(states)),
    body("city").isString(),
    body("name").isString(),
    body("date").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Got an error");
      return res.status(400).send({ errors: errors.array(), validation: true });
    }
    console.log("Got here");

    const reg = await sequelize.models.Registration.create({
      phone: req.body["phone"],
      email: req.body["email"],
      address: req.body["address"],
      state: req.body["state"],
      city: req.body["city"],
      name: req.body["name"],
      date: req.body["date"],
      hasSignedWaiver: false,
    });
    console.log(`Created a new registration with id ${reg.id}`);

    res.send({ success: true });
  }
);

module.exports = router;
