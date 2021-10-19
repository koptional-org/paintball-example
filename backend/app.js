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
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

app.use("/registrations", registrationsRouter);

app.post("/test", (req, res) => res.send(req.body));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
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
