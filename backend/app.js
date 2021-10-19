const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
var cors = require("cors");
const registrationsRouter = require("./routes/registrations");

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());

app.use("/registrations", registrationsRouter);

app.post("/test", (req, res) => res.send(req.body));

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
