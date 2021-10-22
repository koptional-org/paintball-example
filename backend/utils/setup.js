const { sequelize, Registration } = require("../models/models");

async function setupDb() {
  try {
    await sequelize.authenticate();
    console.log("Database connection opened!");
  } catch (error) {
    console.log("Couldn't connect to database");
  }

  await Registration.sync();
}

module.exports = setupDb;
