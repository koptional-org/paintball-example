const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const states = require("../utils/states");
const { sequelize } = require("../models/models");
const { default: axios } = require("axios");

/**
 * fetch schedule
 */
router.get("/", async (req, res) => {
  try {
    const regs = await sequelize.models.Registration.findAll();
    res.send({ rows: regs });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
      return res.status(400).send({ errors: errors.array(), validation: true });
    }
    const formId = process.env.LIABILITY_WAIVER_ID;
    const wsAPIKey = process.env.WAIVERCAT_API_KEY;
    try {
      const response = await axios.post(
        `https://app.waivercat.com/api/v2/forms/${formId}/envelopes?api_key=${wsAPIKey}`,
        {
          send_email: true,
          signers: [
            {
              prefilled_fields: [
                {
                  value: req.body.name,
                  label: "Full name",
                },
                {
                  value: req.body.phone,
                  label: "Phone Number",
                },
                {
                  value: req.body.city,
                  label: "City",
                },
                {
                  value: req.body.state,
                  label: "State",
                },
                {
                  value: req.body.address,
                  label: "Address",
                },
                {
                  value: req.body.email,
                  label: "Email",
                },
              ],
              email: req.body.email,
            },
          ],
        }
      );
      await sequelize.models.Registration.create({
        phone: req.body["phone"],
        email: req.body["email"],
        address: req.body["address"],
        state: req.body["state"],
        city: req.body["city"],
        name: req.body["name"],
        date: req.body["date"],
        envelopeId: response.data.id,
        hasSignedWaiver: false,
      });
      res.send({ success: true });
    } catch (error) {
      console.log(error.response.data);
      res.status(500).send({ message: error.message });
    }
  }
);

router.get("/cron", async (req, res) => {
  try {
    const formId = process.env.LIABILITY_WAIVER_ID;
    const wsAPIKey = process.env.WAIVERCAT_API_KEY;

    const { data } = await axios.get(
      `https://app.waivercat.com/api/v2/forms/${formId}/envelopes?api_key=${wsAPIKey}`
    );

    console.log(data);

    await Promise.all(
      data.data.map(async ({ id, is_complete }) => {
        await sequelize.models.Registration.update(
          {
            hasSignedWaiver: is_complete,
          },
          {
            where: {
              envelopeId: id,
            },
          }
        );
      })
    );
    res.send({ success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
