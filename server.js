"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var express = require("express");
var fs = require("fs");
var app = express();
var cors = require('cors');
var dotenv = require('dotenv');
// Configure Environment Variables
dotenv.config();
// Connect to Mongo via Mongoose
// mongoose
// For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.
// .set('useCreateIndex', true)
// .set('useFindAndModify', false)
// .connect(process.env.DB_HOST_DEV, {
//   useNewUrlParser: true, useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.log(err))
// Middleware
app.use(cors());
app.use(express.json());
// API Routes
// app.use()
// Listen on PORT
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
