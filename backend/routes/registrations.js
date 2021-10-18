const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const states = require("../utils/states");
const sqlite3 = require("sqlite3").verbose();

/**
 * fetch schedule
 */
router.get("/", function (req, res) {
  // Fetch from the database
  const db = new sqlite3.Database("./paintball.db", (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("Connected to db");
  });

  db.all(
    `SELECT phone, email, address, state, city, name FROM registrations;`,
    [],
    (err, rows) => {
      if (err) {
        throw new Error(err.message);
      }
      res.send({ rows: rows });
      return rows;
    }
  );
  db.close();
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
      console.log("Got an error");
      return res.status(400).json({ errors: errors.array() });
    }
    const db = new sqlite3.Database("./paintball.db", (err) => {
      if (err) {
        console.log(err.message);
      }
    });

    db.run(
      `INSERT INTO registrations(phone, email, address, state, city, name) VALUES(?,?,?,?,?,?)`,
      [
        req.body["phone"],
        req.body["email"],
        req.body["address"],
        req.body["state"],
        req.body["city"],
        req.body["name"],
      ],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with row ID ${this.lastID}`);
        db.close();
      }
    );
    // Create a new record in db
    res.send({ success: true });
  }
);

module.exports = router;
