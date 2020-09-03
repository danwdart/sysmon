const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const axios = require("axios");
// const passport = require("passport");
// const ClientPasswordStrategy = require("passport-oauth2-client-password");

const reportRoute = require("./routes/report");

const app = express();

// We don't need to use any views.

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/*

Could have done it this way...

app.use(passport.initialize());
app.use(passport.session());

passport.use(new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    console.log("done", clientId, clientSecret)
    done(null, null);
  }
));
*/

app.get("/report/", reportRoute);
app.get("/report/:id", reportRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// There'll also be no error handler because we expect to stay on one page.

module.exports = app;
